/**
 * Company facts and homepage stat numbers.
 * Edit this file to change what the site displays. Do not add figures
 * that are not real facts about Roadrunner USA Inc.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:4317";

export const site = {
  legalName: "Roadrunner USA Inc",
  brand: "RoadRunner USA",
  tagline: "Ship Safe. Ship Fast. Ship Efficient.",
  phone: "(413) 539-7319",
  phoneHref: "tel:+14135397319",
  email: "info@rdrunnerusa.com",
  emailHref: "mailto:info@rdrunnerusa.com",
  location: "Based in North Carolina",
  equipment: "Dry van",
  mode: "Full truckload",
  lane: {
    west: "Southern California",
    east: "Dallas, TX",
    summary: "Southern California to Dallas, TX, and Dallas back to Southern California",
  },
} as const;

export const hubs = [
  { city: "Mira Loma", state: "CA" },
  { city: "Rock Hill", state: "SC" },
  { city: "Grapevine", state: "TX" },
] as const;

/**
 * Numbers rendered in the homepage stat row.
 * `display` is the text that remains.
 */
export const stats = [
  {
    id: "mode",
    display: "FTL",
    label: "Full truckload",
    detail: "Dry van freight",
  },
  {
    id: "lane",
    display: "SoCal",
    label: "to Dallas, and back",
    detail: "The core round trip",
  },
  {
    id: "office",
    display: "NC",
    label: "Dispatch office",
    detail: "Based in North Carolina",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Dispatch",
    summary: "A North Carolina desk that works the SoCal–Dallas round trip.",
    body: "Dispatch is based in North Carolina and lines up our dry van fleet on the lane between Southern California and Dallas. Call or email and you reach the people who run these trucks.",
  },
  {
    number: "02",
    title: "Customer Support",
    summary: "Quotes, pickups, and delivery questions go to the same office.",
    body: "Customer support is the same office. Phone the desk or write info@rdrunnerusa.com and a person on this account follows up.",
  },
  {
    number: "03",
    title: "Live GPS Tracking",
    summary: "Motive GPS on every load. Dispatch replies with a tracking link or a location update.",
    body: "Every load is GPS-tracked with Motive. Send your load number and the best way to reach you, and our dispatch team will reply with a live tracking link or a current location update.",
  },
  {
    number: "04",
    title: "Dry Van Truckload",
    summary: "Full truckloads on the Southern California–Dallas round trip.",
    body: "Company-operated dry vans haul full truckloads. The main lane runs Southern California to Dallas, Texas, then turns around and comes back to Southern California. We also run Dallas, TX to Charlotte, NC.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Send the shipment",
    body: "Tell us the pickup city, the delivery city, the ship date, and what is going on the truck.",
  },
  {
    number: "02",
    title: "Dispatch prices it",
    body: "The desk reviews the request and comes back to the phone or email you gave us.",
  },
  {
    number: "03",
    title: "A dry van rolls",
    body: "When the freight fits, a dry van runs it full truckload on the Southern California–Dallas round trip.",
  },
  {
    number: "04",
    title: "Ask for a status",
    body: "Every load is GPS-tracked with Motive. Send the load number and dispatch replies with a tracking link or a location update.",
  },
] as const;

export const partners = [
  "Descartes MacroPoint",
  "project44",
  "Motive",
  "Highway",
  "Trucker Tools",
  "Verified Carrier",
] as const;

export const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61550872886760",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/roadrunnerusainc/",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/tracking", label: "Tracking" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const photos = {
  hero: {
    src: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=2000",
    alt: "White dry van semi-trucks on a curving highway in warm light",
    credit: "Pexels",
  },
  highway: {
    src: "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "A white dry van semi-truck driving a mountain highway",
    credit: "Pexels",
  },
  dusk: {
    src: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1800&q=80",
    alt: "A dry van trailer on an open highway at dusk",
    credit: "Unsplash",
  },
  desk: {
    src: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Office staff wearing headsets beside a window",
    credit: "Pexels",
  },
} as const;

export const faqs = [
  {
    q: "What do you haul?",
    a: "Full truckloads in company-operated dry vans.",
  },
  {
    q: "Where do the trucks run?",
    a: "We haul coast to coast across all 48 lower states. Our core lane is Southern California to Dallas, Texas.",
  },
  {
    q: "How do I request a rate?",
    a: "Use the quote form, call (413) 539-7319, or email info@rdrunnerusa.com.",
  },
  {
    q: "How do I get a tracking update?",
    a: "Every load is GPS-tracked with Motive. Send your load number and the best way to reach you, and our dispatch team will reply with a live tracking link or a current location update.",
  },
  {
    q: "Where is the office?",
    a: "Based in North Carolina. That is dispatch and customer support.",
  },
] as const;

export const places = [
  {
    role: "Lane end",
    name: "Southern California",
    detail:
      "One end of the round trip. Dry vans pick up and deliver on this side, then head for Dallas.",
  },
  {
    role: "Lane end",
    name: "Dallas, Texas",
    detail:
      "The other end of the round trip. Freight turns around here and runs back to Southern California.",
  },
  {
    role: "Headquarters",
    name: "Based in North Carolina",
    detail: "Dispatch and customer support.",
  },
] as const;
