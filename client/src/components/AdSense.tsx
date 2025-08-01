import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  width?: number;
  height?: number;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ 
  adSlot, 
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  width, 
  height, 
  className = "" 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Initialize adsbygoogle array if it doesn't exist
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }
      
      // Push the ad to be loaded
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "auto",
        }}
        data-ad-client="ca-pub-4994973818889629"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        {...(adLayout && { "data-ad-layout": adLayout })}
        {...(adLayoutKey && { "data-ad-layout-key": adLayoutKey })}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// مكون للإعلان العلوي (Auto Format)
export function TopBannerAd() {
  return (
    <AdSense
      adSlot="2979454262"
      adFormat="auto"
      className="mx-auto block"
    />
  );
}

// مكون للإعلان الجانبي (In-Article)
export function SidebarAd() {
  return (
    <AdSense
      adSlot="5556450486"
      adFormat="fluid"
      adLayout="in-article"
      className="mx-auto block text-center"
    />
  );
}

// مكون للإعلان السفلي (Fluid Layout)
export function BottomBannerAd() {
  return (
    <AdSense
      adSlot="8300881944"
      adFormat="fluid"
      adLayoutKey="-fb+5w+4e-db+86"
      className="mx-auto block"
    />
  );
}