import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xvmmxtesjvurqkkjslux.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bW14dGVzanZ1cnFra2pzbHV4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjI0NTQ0OCwiZXhwIjoyMDIxODIxNDQ4fQ.VhHxjnJr-KSoFJbnKHgxU5o-asgZIaYVRqWV0Kk2nEQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupa = async (file) => {
  const fileName = "avatars/" + Date.now();
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);
  if (error) {
    return error;
  }
  const attachmentUrl = await supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);
  console.log;
  return attachmentUrl;
};
