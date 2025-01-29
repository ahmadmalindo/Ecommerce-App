import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mlknwkdvneqbitcuzehk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa253a2R2bmVxYml0Y3V6ZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NzQzMjMsImV4cCI6MjA1MTQ1MDMyM30.KjjoIHgmfDA7Uc_SWFXZszvxTANUPN5ymdUChCTK0iE'

export const supabase = createClient(supabaseUrl, supabaseKey)