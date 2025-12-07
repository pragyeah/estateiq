# Database Migration Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Workflow Fails with "Connection Failed"

**Symptoms:**
- GitHub Actions workflow fails with connection errors
- Error message: "Failed to connect to database"

**Solutions:**

1. **Check Connection String Format**
   - Must start with: `postgresql://`
   - Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
   - Make sure you replaced `[PASSWORD]` with your actual password

2. **URL Encode Special Characters in Password**
   - If your password contains special characters, they need to be URL-encoded:
     - `@` → `%40`
     - `#` → `%23`
     - `%` → `%25`
     - `&` → `%26`
     - `+` → `%2B`
     - `=` → `%3D`
     - `?` → `%3F`
     - `/` → `%2F`
     - ` ` (space) → `%20`

3. **Verify Password in Supabase**
   - Go to Supabase Dashboard → Settings → Database
   - Check your database password
   - If needed, reset it and update the GitHub secret

4. **Check Supabase Project Status**
   - Make sure your Supabase project is active
   - Check if the project is paused (free tier projects pause after inactivity)

### Issue 2: Workflow Fails with "Table Already Exists"

**Symptoms:**
- Error: "relation already exists"
- Workflow fails but tables are actually created

**Solution:**
- This is usually OK! The migration uses `CREATE TABLE IF NOT EXISTS`
- The workflow has been updated to handle this gracefully
- If you see this error, check your Supabase database - tables likely exist already

### Issue 3: Workflow Runs on Every Push

**Symptoms:**
- Workflow runs even when migration files haven't changed
- Getting too many emails

**Solution:**
- The workflow is configured to only run when files in `migrations/**` change
- If it's running on every push, check:
  1. Are you modifying files in the `migrations/` folder?
  2. Is the workflow file itself being modified? (This shouldn't trigger it, but check)

**To prevent unnecessary runs:**
- Only commit changes to `migrations/` folder when you actually have new migrations
- The workflow will skip if no migration files changed

### Issue 4: "Secret Not Found" Error

**Symptoms:**
- Error: `SUPABASE_DB_URL secret is not set`

**Solution:**
1. Go to: https://github.com/pragyeah/estateiq/settings/secrets/actions
2. Verify `SUPABASE_DB_URL` exists
3. If missing, add it following the setup guide in `SETUP_GITHUB_SECRET.md`

### Issue 5: SQL Syntax Errors

**Symptoms:**
- Error: "syntax error at or near..."
- Migration file has issues

**Solution:**
1. Check `migrations/001_init.sql` for syntax errors
2. Test the SQL manually in Supabase SQL Editor first
3. Make sure all SQL statements end with semicolons
4. Verify table names and column types are correct

## How to Test Your Connection String Locally

Before adding to GitHub, test your connection string:

```bash
# Install psql if you don't have it
# Windows: Install PostgreSQL
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql-client

# Test connection
psql "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" -c "SELECT version();"
```

If this works, your connection string is correct!

## Manual Migration (Alternative)

If the automated workflow keeps failing, you can run migrations manually:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the contents of `migrations/001_init.sql`
3. Paste and run it
4. This will create all tables needed

**Note:** Manual migration is fine for initial setup. The automated workflow is useful for future migrations.

## Checking Workflow Logs

To see detailed error messages:

1. Go to: https://github.com/pragyeah/estateiq/actions
2. Click on the failed workflow run
3. Click on the "migrate" job
4. Expand the "Run migrations" step to see detailed error messages

## Quick Fixes

### Fix 1: Update Connection String
1. Get fresh connection string from Supabase Dashboard
2. Make sure password is URL-encoded if it has special characters
3. Update GitHub secret: https://github.com/pragyeah/estateiq/settings/secrets/actions

### Fix 2: Disable Workflow Temporarily
If you want to stop the workflow from running:
1. Go to `.github/workflows/supabase-migrations.yml`
2. Comment out the `on:` section or add a condition to skip

### Fix 3: Run Migration Manually
1. Go to Supabase Dashboard → SQL Editor
2. Run `migrations/001_init.sql` manually
3. This will create all tables

## Still Having Issues?

1. **Check the workflow logs** for specific error messages
2. **Verify your connection string** format and password
3. **Test connection locally** using psql
4. **Run migration manually** in Supabase SQL Editor as a workaround
5. **Check Supabase project status** - make sure it's active

The workflow is designed to be resilient, but if you continue having issues, running the migration manually is a perfectly valid solution!

