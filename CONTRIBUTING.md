# Collaborative Git Workflow Guide

This document outlines the step-by-step workflow for developers collaborating on this project using Git and GitHub. It assumes **no branch protection rules** but relies on team discipline and a `dev` staging branch.

## Table of Contents

1. [Repository Setup](#1-repository-setup)
2. [Developer Setup](#2-developer-setup)
3. [Daily Workflow](#3-daily-workflow)
4. [Merging to Production](#4-merging-to-production)
5. [Conflict Resolution](#5-conflict-resolution)
6. [Hotfixes](#6-hotfixes)
7. [Best Practices](#7-best-practices)
8. [Troubleshooting](#8-troubleshooting)

## 1. Repository Setup

### Branches

- `main`: Production-ready code (stable releases).
- `dev`: Staging area for tested features (merged from feature branches).

### Initialization (Repo Owner - Repro)

```bash
# Create dev branch
git checkout -b dev
git push origin dev
```

## 2. Developer Setup

### First-Time Setup

1. Clone the repository:

```bash
git clone https://github.com/repro123/Vendsr-frontend.git
cd Vendsr-frontend  # Navigate into the repo folder
```

2. Sync all branches

```bash
git fetch --all
```

3. Switch to `dev`

```bash
git checkout dev
git pull origin dev  # Get latest dev code
```

## 3. Daily Workflow

### Step 1: Start a New Feature

1. Create a feature branch from `dev`:

```bash
git checkout dev
git pull origin dev          # Update local dev
git checkout -b your-branch-name
```

    - Branch naming: use the feature you are working on as the branch name e.g. login, hero-section, etc

### Step 2: Develop Locally

1.  Make code changes in your feature branch.
2.  Commit changes:

```bash
git add .
git commit -m "Description of changes"
```

3.  Push to your remote branch

```bash
git push origin your-branch-name
```

### Step 3: Merge to dev (Staging)

1. Create a Pull Request (PR):
   - On GitHub, navigate to **Pull Requests → New Pull Request**
   - Set:
     - **Base branch**: dev
     - **Compare branch**: your-branch-name
   - Add a description
2. Review and Merge:

   - Team reviews the PR.
   - Merge into dev after approval

## 4. Merging to Production

### When `dev` is Stable

1. **Create a PR from `dev` → `main`.**
2. Final review by team lead.
3. **Merge and Tag:**

```bash
git checkout main
git merge dev
git tag v1.0.0  # Semantic versioning
git push origin main --tags
```

4. **Sync `dev` with `main`:**

```bash
git checkout dev
git merge main
git push origin dev
```

## 5. Conflict Resolution

### Prevent Conflicts

- Regularly sync your branch with `dev`:

```bash
git checkout your-branch
git pull origin dev  # Merge latest dev changes
```

- Resolve conflicts locally, then push:

```bash
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/your-feature
```

## 7. Best Practices

🔄 Sync Frequently: Pull `dev` into your feature branch daily.

🗑️ Delete Old Branches: After merging, delete remote and local branches.

✏️ Descriptive Messages: Use clear commit/PR descriptions.

🧪 Test Before Merging: Verify code in `dev` before merging to `main`.

📢 Communicate: Discuss large changes with the team early.

## 8. Troubleshooting

### "Fatal: Not a git repository"

- You’re not in the repo folder. Run:

```bash
cd Vendsr-frontend  # Navigate to the cloned repo
```

### Accidental Direct Push to main

- Revert the commit and inform the team:

```bash
git revert HEAD  # Undo the last commit
git push origin main
```
