# Gemini CLI Migration Steps for Teammates

If you are using Gemini CLI, you can automate the entire sync and migration process. Follow these steps:

### 1. Pull the changes
First, pull the latest updates from the main branch:
```bash
git pull origin main
```

### 2. Give these instructions to Gemini CLI
Copy and paste the following prompt into your Gemini CLI session. It will automatically clean up the old folders and fix any local code you wrote:

---

**PROMPT FOR GEMINI CLI:**
> I have just pulled major structural changes that renamed all packages and directories to lowercase (e.g., `Controller` -> `controller`).
>
> Please do the following to sync my local environment:
> 1. **Clean up old folders:** Delete any remaining PascalCase directories in `backend/src/main/java/com/example/RUNTIME_REBELS/` (like `Controller`, `Service`, `Models`, `Repository`, `Config`) if they still exist.
> 2. **Standardize local files:** Search through all `.java` files in `backend/src/main/java/` and ensure all package declarations and imports use lowercase paths (e.g., `com.example.RUNTIME_REBELS.service` instead of `.Service`).
> 3. **Verify Configuration:** Ensure `application.properties` has the correct `DataSource` and `Mail` settings.
> 4. **Validate:** Run `mvn clean compile` in the `backend` directory to ensure everything is aligned.

---

### 3. Benefits of using Gemini CLI for this:
- **Case Sensitivity:** Gemini will handle the Windows case-insensitivity issues that often cause duplicate folders.
- **Surgical Updates:** It will only update the package lines in your new files without touching your business logic.
- **Compilation Check:** It will verify that your local changes work with the new `camelCase` model fields (like `roomId` instead of `room_Id`).
