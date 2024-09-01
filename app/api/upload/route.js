import { supabase } from "@/lib/supabase"; 

export async function POST(req) {
    try {
        console.log('Received request');

        const formData = await req.formData();
        console.log('FormData received:', formData);

        const file = formData.get('file');
        if (!file) {
            console.log('No file uploaded');
            return new Response('No file uploaded', { status: 400 });
        }

        console.log('File received:', file.name);

        // Upload file to Supabase
        const { data, error: uploadError } = await supabase.storage
            .from('test-image-upload') // Replace with your bucket name
            .upload(`public/${file.name}`, file, {
                contentType: file.type,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return new Response(uploadError.message, { status: 500 });
        }

        console.log('Upload data:', data);

        // Get the public URL of the uploaded file
        const { publicURL, error: urlError } = supabase.storage
            .from('test-image-upload') // Replace with your bucket name
            .getPublicUrl(`public/${file.name}`);

        if (urlError) {
            console.error('URL error:', urlError);
            return new Response(urlError.message, { status: 500 });
        }

        console.log('Public URL:', publicURL);

        // Return the public URL
        return new Response(JSON.stringify({ publicUrl: publicURL }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Server error:', error);
        return new Response(error.message, { status: 500 });
    }
}
