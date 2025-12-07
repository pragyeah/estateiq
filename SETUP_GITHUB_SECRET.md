# Setting Up GitHub Secret for Supabase Migrations

## Step 1: Get Your Supabase Database Connection String

1. **Go to your Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Sign in and select your project

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click on **Database** in the settings menu

3. **Get the Connection String**
   - Scroll down to the **Connection string** section
   - You'll see different connection modes (URI, JDBC, etc.)
   - **Select "URI" mode** (it should show a connection string starting with `postgresql://`)
   - The connection string will look like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
     ```

4. **Find Your Database Password**
   - If you don't remember your database password:
     - In the same Database settings page, look for **Database password** section
     - If you need to reset it, click **Reset database password**
     - **Important**: Save the password somewhere safe!

5. **Replace `[YOUR-PASSWORD]` in the connection string**
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - **Example**: If your password is `MySecurePass123!`, the connection string should be:
     ```
     postgresql://postgres:MySecurePass123!@db.abcdefghijklmnop.supabase.co:5432/postgres
     ```
   - **Note**: If your password contains special characters, you may need to URL-encode them:
     - `@` becomes `%40`
     - `#` becomes `%23`
     - `%` becomes `%25`
     - `&` becomes `%26`
     - `+` becomes `%2B`
     - `=` becomes `%3D`
     - `?` becomes `%3F`
     - `/` becomes `%2F`
     - ` ` (space) becomes `%20`

## Step 2: Add the Secret to GitHub

1. **Go to your GitHub repository**
   - Visit: https://github.com/pragyeah/estateiq
   - Make sure you're signed in

2. **Navigate to Secrets**
   - Click on **Settings** tab (at the top of the repository)
   - In the left sidebar, click on **Secrets and variables**
   - Click on **Actions**

3. **Add New Secret**
   - Click the **New repository secret** button (green button on the right)

4. **Enter Secret Details**
   - **Name**: `SUPABASE_DB_URL` (must be exactly this, case-sensitive)
   - **Secret**: Paste your complete connection string (the one with your password replaced)
     - Example: `postgresql://postgres:MySecurePass123!@db.abcdefghijklmnop.supabase.co:5432/postgres`

5. **Save the Secret**
   - Click **Add secret** button
   - The secret is now saved and encrypted

## Step 3: Verify It Works

1. **Test the Workflow**
   - The next time you push changes to files in the `migrations/` folder, the workflow should run automatically
   - You can also manually trigger it by:
     - Going to **Actions** tab in your GitHub repository
     - Clicking on **Supabase Migrations** workflow
     - Clicking **Run workflow** button

2. **Check the Workflow Status**
   - Go to the **Actions** tab
   - You should see the workflow running
   - If successful, you'll see "✅ Migration completed successfully!"
   - If it fails, check the logs for error messages

## Troubleshooting

### Connection String Issues

- **"password authentication failed"**: Your password is incorrect. Double-check it in Supabase settings.
- **"could not connect to server"**: Check that your Supabase project is active and the connection string is correct.
- **Special characters in password**: Make sure to URL-encode special characters (see Step 1, point 5).

### Finding Your Password

If you've lost your database password:
1. Go to Supabase Dashboard → Settings → Database
2. Look for "Database password" section
3. If you see "Reset database password", click it
4. **Important**: Resetting will disconnect any active connections temporarily
5. Copy the new password and update your connection string

### Testing the Connection String Locally (Optional)

You can test if your connection string works before adding it to GitHub:

```bash
# Install psql if you don't have it (Windows: install PostgreSQL, Mac: brew install postgresql)
# Then test the connection:
psql "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres" -c "SELECT version();"
```

If this works, your connection string is correct!

## Security Notes

- ✅ GitHub secrets are encrypted and only accessible to GitHub Actions
- ✅ The secret is never exposed in logs (GitHub automatically masks it)
- ✅ Only repository collaborators with write access can view/manage secrets
- ⚠️ Never commit your connection string to your code repository
- ⚠️ Never share your database password publicly

