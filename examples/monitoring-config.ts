import { PrometheusOptions } from "@willsoto/nestjs-prometheus";
import { WinstonModuleOptions } from "nest-winston";
import * as winston from "winston";

/**
 * This is an example configuration for Grafana Prometheus.
 * Prometheus can watch a server and itself and give you
 * metrics in real-time as well as send alerts if any
 * boundaries are triggered.
 */
export const prometheusConfig: PrometheusOptions = {
  defaultMetrics: {
    enabled: true,
    config: {
      prefix: "goal_tracker_",
    },
  },
};

export const loggingConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  metaKey: "metadata",
};

export const healthCheckConfig = {
  memoryThreshold: 85, // percentage
  cpuThreshold: 80, // percentage
  endpoints: [
    {
      name: "api",
      url: "/health",
      interval: 30000, // 30 seconds
    },
    {
      name: "database",
      interval: 60000, // 1 minute
    },
  ],
};

export const alertConfig = {
  thresholds: {
    responseTime: 1000, // ms
    errorRate: 5, // percentage
    cpuUsage: 80, // percentage
    memoryUsage: 85, // percentage
  },
  notifications: {
    email: process.env.ALERT_EMAIL,
    webhook: process.env.ALERT_WEBHOOK,
  },
};

export const bulkLoadConfig = {
  caching: {
    initialLoadTTL: 300, // 5 minutes
    dashboardTTL: 60, // 1 minute
  },
  pagination: {
    recentNotes: 10,
    recentJournals: 10,
    activeGoals: 20,
  },
  parallelQueries: true,
};
