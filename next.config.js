const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : null;

module.exports = {
  images: {
    unoptimized: true,

    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};
