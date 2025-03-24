# goal-tracker-app

NestJS, React Native, Prisma, PostgresSQL

# Tables / Entities

## users

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- username
- hashed_password
- milestones
- goals
- notes
- journals

## goals

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- due_date
- title
- description
- priority (enum: LOW, MEDIUM, HIGH, CRITICAL)
- status (enum: NOT_STARTED, IN_PROGRESS, BLOCKED, COMPLETED)
- tags (string[])
- content_type (enum: PLAIN_TEXT, MARKDOWN)
- steps (goal[])

## note_folder

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- name
- notes

## notes

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- content
- content_type (enum: PLAIN_TEXT, MARKDOWN)
- folder_id (references note_folder)

## journal_folder

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- name
- description
- user_id (references users)

## journals

- id
- datetime
  - createdAt
  - deletedAt
  - updatedAt
- title
- content
- contentType (enum: PLAIN_TEXT, MARKDOWN)
- folder_id (references journal_folder)

# API & Server Architecture

## Core Components

- **API Gateway**: Entry point for all requests
- **Service Layer**: Business logic implementation
- **Data Access Layer**: Prisma ORM interfaces
- **Monitoring Layer**: Cross-cutting concern for all requests

## Monitoring Stack

- **Performance Metrics**

  - Request duration
  - Database query times
  - Memory usage
  - CPU usage
  - Active connections

- **Health Checks**

  - API endpoint status
  - Database connectivity
  - Memory thresholds
  - CPU thresholds

- **Logging**
  - Request/Response logging
  - Error tracking
  - Performance anomalies
  - Database query issues

## API Endpoints

### Health & Monitoring

- `GET /health` - Basic health check
- `GET /metrics` - Prometheus-compatible metrics endpoint

### Users

- `GET /users/:id` - Get user profile
- `GET /users/:id/goals` - List user goals
- `GET /users/:id/milestones` - List user milestones
- `GET /users/:id/notes` - List user notes
- `GET /users/:id/notes/:noteId` - Get specific user note
- `POST /users/:id/notes` - Create note for user
- `PUT /users/:id/notes/:noteId` - Update user note
- `DELETE /users/:id/notes/:noteId` - Delete user note
- `GET /users/:id/note-folders` - List user note folders
- `POST /users/:id/note-folders` - Create note folder for user
- `GET /users/:id/journals` - List user journal entries
- `GET /users/:id/journals/:journalId` - Get specific journal entry
- `POST /users/:id/journals` - Create journal entry for user
- `PUT /users/:id/journals/:journalId` - Update journal entry
- `DELETE /users/:id/journals/:journalId` - Delete journal entry
- `GET /users/:id/journal-folders` - List user journal folders
- `POST /users/:id/journal-folders` - Create journal folder for user

### Composite Data Loading

- `GET /users/:id/initial-load` - Get all essential user data in one call

  - Returns:
    ```typescript
    {
      user: UserProfile;
      goals: {
        active: Goal[];
        completed: Goal[];
      };
      milestones: Milestone[];
      notes: {
        folders: NoteFolder[];
        recentNotes: Note[];
      };
      journals: {
        folders: JournalFolder[];
        recentEntries: JournalEntry[];
      };
    }
    ```

- `GET /users/:id/dashboard` - Get dashboard-specific data
  - Returns:
    ```typescript
    {
      activeGoals: Goal[];
      upcomingMilestones: Milestone[];
      recentNotes: Note[];
      recentJournals: JournalEntry[];
      statistics: {
        completedGoals: number;
        totalGoals: number;
        notesCount: number;
        journalCount: number;
      };
    }
    ```

### Goals

- `GET /goals` - List goals
- `POST /goals` - Create goal
- `GET /goals/:id` - Get goal details
- `PUT /goals/:id` - Update goal
- `DELETE /goals/:id` - Delete goal

### Notes

- `GET /notes` - List notes
- `POST /notes` - Create note
- `GET /notes/:id` - Get note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

### Journal

- `GET /journal/entries` - List entries
- `POST /journal/entries` - Create entry
- `GET /journal/entries/:id` - Get entry
- `PUT /journal/entries/:id` - Update entry
- `DELETE /journal/entries/:id` - Delete entry
