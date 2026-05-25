# Project Reorganization - Sync Instructions

We have standardized the project structure to use **lowercase** package and directory names (e.g., `controller`, `service`, `model`) to follow Java best practices and resolve compilation issues.

If you are still on the old version (PascalCase folders like `Controller/`), follow these exact steps to sync your branch safely:

### Step 1: Commit Your Current Work
Make sure you don't have any uncommitted changes.
```bash
git add .
git commit -m "Save work before sync"
```

### Step 2: Pull the Changes
Pull the latest changes from the main branch.
```bash
git pull origin main
```

### Step 3: Handle Directory Case Conflicts (Crucial)
On Windows/macOS, Git might leave the old PascalCase folders behind if you had untracked files in them. To fix this:
1.  **Close your IDE** (IntelliJ/VS Code).
2.  Open your terminal in the project root.
3.  Run these commands to clean up any leftover folders:
    ```powershell
    # Windows (PowerShell)
    Remove-Item -Recurse -Force backend/src/main/java/com/example/RUNTIME_REBELS/Controller
    Remove-Item -Recurse -Force backend/src/main/java/com/example/RUNTIME_REBELS/Service
    Remove-Item -Recurse -Force backend/src/main/java/com/example/RUNTIME_REBELS/Repository
    Remove-Item -Recurse -Force backend/src/main/java/com/example/RUNTIME_REBELS/Models
    Remove-Item -Recurse -Force backend/src/main/java/com/example/RUNTIME_REBELS/Config
    ```

### Step 4: Update Your Local Files (If any)
If you created **new** files that weren't in the merge, you must update their package name at the top of the file:
*   Change `package com.example.RUNTIME_REBELS.Controller;` -> `package com.example.RUNTIME_REBELS.controller;`
*   Change `package com.example.RUNTIME_REBELS.Service;` -> `package com.example.RUNTIME_REBELS.service;`
*   (And similarly for `repository`, `model`, and `config`).

### Step 5: Verify & Run
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

---
**Why we did this:**
- Resolved `cannot find symbol` compilation errors.
- Fixed `JavaMailSender` and `DataSource` configuration issues.
- Standardized the project to match industry conventions.
