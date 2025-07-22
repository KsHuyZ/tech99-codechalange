# Scoreboard API Module Specification

## Overview

This module provides a backend API for a website scoreboard that displays the top 10 users' scores and supports live updates. It securely handles score updates triggered by user actions and prevents unauthorized score manipulation.

## Features

- Retrieve the top 10 users by score
- Live update support for the scoreboard (WebSocket only)
- Securely update user scores upon valid actions
- Prevent unauthorized score increases

## API Endpoints

### 1. Get Top 10 Scores

- **Endpoint:** `GET /api/scoreboard/top`
- **Description:** Returns the top 10 users with the highest scores.
- **Response:**
  ```json
  [
    { "userId": "string", "username": "string", "score": number },
    ...
  ]
  ```

### 2. Update User Score

- **Endpoint:** `POST /api/scoreboard/update`
- **Description:** Increases the score for the authenticated user after a valid action.
- **Request Body:**
  ```json
  { "actionId": "string" }
  ```
- **Authentication:** Required (JWT or session-based)
- **Response:**
  ```json
  { "success": true, "newScore": number }
  ```

### 3. Live Scoreboard Updates (WebSocket Only)

- **Endpoint:** `WS /ws/scoreboard`
- **Description:** Establishes a WebSocket connection for real-time scoreboard updates.
- **Response:** Stream of top 10 scores as they change, sent as WebSocket messages.

## Security Considerations

- **Authentication:** All score update requests must be authenticated (JWT/session/cookie).
- **Authorization:** Ensure the user can only update their own score.
- **Action Validation:** Server must validate that the action is legitimate (e.g., not replayed or forged).
- **Rate Limiting:** Prevent abuse by limiting the frequency of score updates per user.
- **Audit Logging:** Log suspicious or failed update attempts for monitoring.

## Data Model (Example)

```json
{
  "userId": "string",
  "username": "string",
  "score": number
}
```

## Flow of Execution

1. User completes an action on the website.
2. Website sends an authenticated API request to update the score.
3. Server validates the action and user, updates the score in the database.
4. Server broadcasts the updated top 10 scores to all connected clients via WebSocket.
5. Clients update the scoreboard in real time.

sequenceDiagram
  participant User
  participant Website
  participant API_Server
  participant DB
  participant Clients

  User->>Website: Complete Action
  Website->>API_Server: POST /api/scoreboard/update (auth)
  API_Server->>DB: Validate & Update Score
  API_Server-->>Website: Response (new score)
  API_Server-->>Clients: Broadcast updated top 10 (WebSocket)
  Clients->>Website: Update scoreboard UI

## Improvements & Suggestions

- Use Redis or in-memory cache for fast leaderboard queries.
- Consider using a message queue (e.g., RabbitMQ) for scaling live updates.
- Implement user notification for significant score changes.
- Add admin endpoints for monitoring and managing suspicious activity.
- Use HTTPS and secure cookies for all communications.

## Implementation Notes

- Use WebSocket for bi-directional, real-time communication.
- Use optimistic concurrency control to avoid race conditions on score updates.
- Ensure scalability for high-traffic scenarios.
