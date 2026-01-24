# Supabase Setup Instructions

To make the map application work with Supabase, follow these steps:

## 1. Create a Supabase Project
Go to [Supabase](https://supabase.com/) and create a new project.

## 2. Database Setup
Run the following SQL in the Supabase SQL Editor to create the `markers` table:

```sql
create table markers (
  id text primary key,
  name text,
  description text,
  lat double precision,
  lng double precision,
  group_id text,
  subgroup_id text,
  color text,
  icon text,
  image_data jsonb,
  route_records jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
alter table markers enable row level security;

-- Create a policy that allows anyone to read/write (for development)
-- WARN: For production, you should restrict this!
create policy "Public Access" on markers
for all using (true) with check (true);
```

## 3. Storage Setup
1. Go to "Storage" in the Supabase dashboard.
2. Create a new bucket named `marker-images`.
3. Make the bucket **Public**.
4. Add a policy to allow uploads (or make it public for write as well if you don't have auth).

Policy for Storage (SQL):
```sql
-- Allow public access to images
create policy "Public Access" on storage.objects
for all using ( bucket_id = 'marker-images' );

create policy "Public Upload" on storage.objects
for insert with check ( bucket_id = 'marker-images' );
```

## 4. Configuration
1. Open `config.js` in the project root.
2. Replace `YOUR_SUPABASE_URL` with your project URL (found in Settings > API).
3. Replace `YOUR_SUPABASE_ANON_KEY` with your `anon` public key (found in Settings > API).

## 5. Usage
- **Auto Upload**: When you add or edit a marker, it will be automatically uploaded to Supabase.
- **Sync**: Open the settings menu (⚙️) and click the "Sync to Cloud" (☁️) button to upload all existing markers.
