# Hotel Booking Platform - Backend

## 1. Project Overview
The **Hotel Booking Platform** is a production-grade backend system designed to facilitate seamless hotel discovery, room bookings, and management for Users, Hotel Owners, and Platform Administrators. Similar to industry leaders like Airbnb and Booking.com, this platform provides a robust infrastructure for the travel and hospitality industry.

The system is built with a focus on high availability, security, and scalability, ensuring a smooth experience for guests and a powerful management tool for hotel partners.

---

## 2. Tech Stack
| Category | Technology |
| :--- | :--- |
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.x |
| **Security** | Spring Security, JWT Authentication, BCrypt |
| **Persistence** | Spring Data JPA, Hibernate |
| **Database** | MySQL |
| **Build Tool** | Maven |
| **Utilities** | Lombok, Hibernate Validator |
| **Communication** | Spring Mail (SMTP) |
| **Logging** | SLF4J with Logback |

---

## 3. System Architecture
The application follows a **Modular Monolith Architecture** with a clear separation of concerns using the **Controller-Service-Repository** pattern.

*   **API Layer**: REST Controllers handling HTTP requests and responses.
*   **Service Layer**: Encapsulates business logic and orchestrates cross-module interactions.
*   **Data Access Layer**: JPA Repositories for database operations.
*   **Security Layer**: JWT-based stateless authentication and role-based access control (RBAC).

---

## 4. Database Design
The database is structured to support complex relationships between users, hotels, rooms, and bookings.
*   **Users**: Stores credentials and profiles for all roles (USER, OWNER, ADMIN).
*   **Hotels & Rooms**: Maintains hotel metadata and room availability.
*   **Bookings**: Tracks reservation states.
*   **Reviews**: Captures guest feedback and ratings.

---

## 5. Role-Based Features

### 👤 USER
*   **Discovery**: Search hotels with advanced filtering (location, price, amenities).
*   **Booking**: Real-time room booking and reservation management.
*   **History**: Comprehensive view of past and upcoming bookings.

### 🏨 OWNER
*   **Management**: Complete control over hotel details and room configurations.
*   **Pricing**: Dynamic room pricing and availability management.
*   **Analytics**: Dashboard to view earnings and booking trends.

### 🛡️ ADMIN
*   **Moderation**: Approve or reject hotel listings.
*   **Governance**: Manage platform users and owners.
*   **Oversight**: Full visibility into platform-wide activity.

---

## 6. Layered Architecture & Ownership

### 🧑‍💻 Vamsi (Infrastructure & Transactions)
Responsible for the system's backbone, security, and financial transaction pipeline.
*   **Packages**: `config/`, `controller/` (Auth, Booking), `services/` (Auth, Booking, JWT, Email), `repositories/`, `exception/`, `util/`, `model/` (Infrastructure entities).
*   **Key Modules**: JWT Implementation, Security Filter Chain, Booking logic, Global Exception Handling.

### 🧑‍💻 Jayanth (Domain Implementation)
Responsible for the core hotel discovery and management features.
*   **Packages**: `controller/` (Hotel, Room, Owner, Admin), `services/` (Hotel, Room, Owner, Admin), `model/` (Domain entities).
*   **Key Modules**: Hotel Search Engine, Approval Workflow, Owner/Admin Dashboards.

---

## 7. Team Work Split

| Module | Controllers | Services | Repositories |
| :--- | :--- | :--- | :--- |
| **Security/Auth** | AuthController | AuthService, JWT, UserDetails | UserRepo |
| **Booking** | BookingController | BookingService | BookingRepo |
| **Hotel/Room** | *Jayanth Implementation* | *Jayanth Implementation* | *Shared Repo* |
| **Admin/Owner** | *Jayanth Implementation* | *Jayanth Implementation* | *Shared Repo* |
| **Email/Util** | - | EmailService | - |

---

## 8. Git Workflow
We follow a strict feature-branching workflow to ensure code stability.

1.  **Pull** the latest changes from `main`.
2.  **Create** a local feature branch.
3.  **Commit** small, atomic changes with descriptive messages.
4.  **Test** the module locally.
5.  **Push** to remote and create a Pull Request (PR).

---

## 9. Branching Strategy
*   **`main`**: Production-ready code. No direct commits allowed.
*   **`vamsi-backend-security-booking`**: Primary branch for Vamsi's modules.
*   **`jayanth-hotel-owner-module`**: Primary branch for Jayanth's modules.

---

## 10. Merge Conflict Prevention Rules
To maintain a clean history and avoid conflicts:
1.  **Strict Folder Ownership**: Do NOT modify files in a folder owned by the other developer unless explicitly discussed.
2.  **Configuration Lock**: Only **Vamsi** is authorized to edit:
    *   `SecurityConfig.java`
    *   `pom.xml`
    *   `application.properties`
    *   `User.java` (Entity)
3.  **Sync Before Merge**: Always pull and rebase `main` into your feature branch before merging.
4.  **Atomic Commits**: Keep changes focused on the specific module task.

---

## 11. API Structure
All APIs must follow a standard JSON response structure for consistency:

```json
{
    "timestamp": "2024-05-25T10:00:00",
    "status": 200,
    "message": "Operation Successful",
    "data": { ... }
}
```

---

## 12. Folder Structure
```text
backend/
├── src/main/java/com/example/RUNTIME_REBELS/
│   ├── config/          # Global Configurations & Security Filters
│   ├── controller/      # REST API Controllers
│   ├── services/        # Business Logic Services
│   ├── repositories/    # JPA Data Access Interfaces
│   ├── model/           # JPA Entities and Enums
│   ├── exception/       # Global Exception Handling
│   └── util/            # Common Utilities
└── src/main/resources/
    └── application.properties
```

---

## 13. Development Guidelines
*   **Lombok**: Use `@Data`, `@NoArgsConstructor`, and `@AllArgsConstructor` to keep code clean.
*   **Validation**: Use `jakarta.validation` constraints (e.g., `@NotBlank`, `@Email`) in DTOs.
*   **Logging**: Use `log.info()`, `log.error()`, and `log.warn()` for critical execution paths.
*   **Naming**: Follow standard Java camelCase for methods/variables and PascalCase for classes.

---

## 14. Build & Run Instructions

### Prerequisites
*   JDK 17 or higher
*   MySQL Server
*   Maven

### Steps
1.  **Clone the Repository**:
    ```bash
    git clone <repo-url>
    ```
2.  **Database Setup**: Create a database named `hotel_db` in MySQL.
3.  **Configure Environment**: Update `src/main/resources/application.properties` with your MySQL credentials.
4.  **Build**:
    ```bash
    mvn clean install
    ```
5.  **Run**:
    ```bash
    mvn spring-boot:run
    ```

---

## 15. Future Enhancements
*   Cloudinary integration for hotel images.
*   Redis caching for popular hotel searches.
*   WebSocket for real-time booking notifications.
*   Microservices migration for high-load modules.

---
**Maintained by**: Vamsi & Jayanth
**Project Name**: Runtime Rebels - 25th HCL Hackathon SRMAP
