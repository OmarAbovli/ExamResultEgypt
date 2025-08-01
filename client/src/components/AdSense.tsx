import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
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
        data-ad-client="ca-pub-XXXXXXXXXX" // سيتم استبداله برقمك
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// مكون للإعلان البانر العلوي (728x90)
export function TopBannerAd() {
  return (
    <AdSense
      adSlot="1234567890" // يجب استبداله برقم الإعلان الحقيقي
      width={728}
      height={90}
      className="mx-auto"
    />
  );
}

// مكون للإعلان الجانبي (300x250)
export function SidebarAd() {
  return (
    <AdSense
      adSlot="2345678901" // يجب استبداله برقم الإعلان الحقيقي
      width={300}
      height={250}
      className="mx-auto"
    />
  );
}

// مكون للإعلان السفلي (728x90)
export function BottomBannerAd() {
  return (
    <AdSense
      adSlot="3456789012" // يجب استبداله برقم الإعلان الحقيقي
      width={728}
      height={90}
      className="mx-auto"
    />
  );
}