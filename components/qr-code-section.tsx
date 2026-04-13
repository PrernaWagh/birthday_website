// "use client"

// import { Card } from "@/components/ui/card"

// export function QRCodeSection() {
//   return (
//     <section className="py-16 px-4 relative z-10">
//       <h2 className="text-4xl md:text-5xl font-serif text-center text-foreground mb-4">
//         Share The Love 💕
//       </h2>
//       <p className="text-center text-muted-foreground mb-12">
//         Scan this QR code to share this birthday surprise!
//       </p>

//       <Card className="max-w-sm mx-auto p-8 bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-primary/20 shadow-2xl">
//         <div className="aspect-square bg-background rounded-xl p-4 shadow-inner">
//           {/* QR Code SVG - This generates a decorative QR-like pattern */}
//           {/* Replace with actual QR code pointing to your deployed site */}
//           <svg viewBox="0 0 100 100" className="w-full h-full">
//             {/* QR Code corners */}
//             <rect x="5" y="5" width="25" height="25" fill="currentColor" className="text-foreground" />
//             <rect x="8" y="8" width="19" height="19" fill="currentColor" className="text-background" />
//             <rect x="11" y="11" width="13" height="13" fill="currentColor" className="text-foreground" />
            
//             <rect x="70" y="5" width="25" height="25" fill="currentColor" className="text-foreground" />
//             <rect x="73" y="8" width="19" height="19" fill="currentColor" className="text-background" />
//             <rect x="76" y="11" width="13" height="13" fill="currentColor" className="text-foreground" />
            
//             <rect x="5" y="70" width="25" height="25" fill="currentColor" className="text-foreground" />
//             <rect x="8" y="73" width="19" height="19" fill="currentColor" className="text-background" />
//             <rect x="11" y="76" width="13" height="13" fill="currentColor" className="text-foreground" />
            
//             {/* QR Code data pattern - decorative */}
//             <rect x="35" y="5" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="45" y="5" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="55" y="5" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             <rect x="35" y="15" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="50" y="15" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="60" y="15" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             <rect x="40" y="25" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="55" y="25" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             {/* Heart in center */}
//             <g transform="translate(38, 38)">
//               <path
//                 d="M12 4.5C7 -0.5 0 2 0 8c0 4 6 9 12 14 6-5 12-10 12-14 0-6-7-8.5-12-3.5z"
//                 fill="currentColor"
//                 className="text-primary"
//               />
//             </g>
            
//             {/* More data patterns */}
//             <rect x="5" y="35" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="15" y="40" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="5" y="50" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="20" y="55" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             <rect x="80" y="35" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="90" y="45" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="75" y="50" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="85" y="55" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             <rect x="35" y="70" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="45" y="75" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="55" y="70" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="60" y="80" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="40" y="85" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="50" y="90" width="5" height="5" fill="currentColor" className="text-foreground" />
            
//             <rect x="70" y="70" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="80" y="75" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="75" y="85" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="85" y="80" width="5" height="5" fill="currentColor" className="text-foreground" />
//             <rect x="90" y="90" width="5" height="5" fill="currentColor" className="text-foreground" />
//           </svg>
//         </div>
//         <p className="text-center text-sm text-muted-foreground mt-4">
//           After publishing, replace this with your actual QR code!
//         </p>
//       </Card>
//     </section>
//   )
// }
