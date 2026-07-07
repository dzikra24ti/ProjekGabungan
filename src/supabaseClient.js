import { createClient } from '@supabase/supabase-js';

// Pastikan diisi murni URL saja, jangan ada teks 'https://XYZ...' atau '/rest/v1/' di ujungnya
const supabaseUrl = 'https://nkjdptznpdcdnxfcyadm.supabase.co'; 

// Ganti teks di bawah ini dengan Anon Key asli yang kamu salin dari dashboard Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ramRwdHpucGRjZG54ZmN5YWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzU0NzQsImV4cCI6MjA5OTAxMTQ3NH0.PV0faMTNKCJxqQed_0njU41ijPmjwNuIvga_kUD43AM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);