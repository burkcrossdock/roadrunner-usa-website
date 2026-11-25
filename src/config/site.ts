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
  address: {
    line1: "133 Greenbriar Drive",
    city: "Matthews",
    state: "NC",
    zip: "28104",
    full: "133 Greenbriar Drive, Matthews NC 28104",
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=133+Greenbriar+Drive%2C+Matthews+NC+28104",
  hours: [
    { days: "Monday–Friday", time: "7:00 AM – 11:00 PM EST" },
    { days: "Saturday", time: "9:30 AM – 4:00 PM EST" },
  ],
  hoursNote: "Sunday hours are not posted.",
  fleetCount: 8,
  equipment: "Dry van",
  mode: "Full truckload",
  lane: {
    west: "Southern California",
    east: "Dallas, TX",
    summary: "Southern California to Dallas, TX, and Dallas back to Southern California",
  },
} as const;

/**
 * Numbers rendered in the homepage stat row.
 * `countTo` animates when it is set. `display` is the text that remains.
 */
export const stats = [
  {
    id: "fleet",
    display: "8",
    countTo: 8,
    label: "Dry van trucks",
    detail: "The whole fleet",
  },
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
    detail: "Matthews, North Carolina",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Dispatch",
    summary: "A Matthews desk that works the SoCal–Dallas round trip.",
    body: "Dispatch sits at the Matthews office and lines up the eight dry vans on the lane between Southern California and Dallas. Call or email during posted hours and you reach the people who actually run these trucks.",
  },
  {
    number: "02",
    title: "Customer Support",
    summary: "Quotes, pickups, and delivery questions go to the same office.",
    body: "Customer support is the same small office, not a separate call center. Phone the desk or write info@rdrunnerusa.com and a person on this account follows up during the hours posted on the site.",
  },
  {
    number: "03",
    title: "Live GPS Tracking",
    summary: "Verizon Connect on the trucks. A dispatcher replies with status.",
    body: "The trucks carry Verizon Connect GPS. This website does not open a public tracking map. Send the load number and a dispatcher replies with where that load stands.",
  },
  {
    number: "04",
    title: "Dry Van Truckload",
    summary: "Full truckloads on the Southern California–Dallas round trip.",
    body: "The fleet is eight dry vans hauling full truckloads. The main lane runs Southern California to Dallas, Texas, then turns around and comes back to Southern California.",
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
    body: "The Matthews desk reviews the request during posted hours and comes back to the phone or email you gave us.",
  },
  {
    number: "03",
    title: "A dry van rolls",
    body: "When the freight fits, a dry van runs it full truckload on the Southern California–Dallas round trip.",
  },
  {
    number: "04",
    title: "Ask for a status",
    body: "Verizon Connect is on the truck. Send the load number and a dispatcher replies.",
  },
] as const;

export const partners = [
  "Verizon Connect",
  "Verified Carrier",
  "Schneider",
  "TIA",
  "TCS",
] as const;

export const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    note: "Placeholder profile link",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    note: "Placeholder profile link",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    note: "Placeholder profile link",
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
    a: "Full truckloads in dry vans. The fleet is eight trucks.",
  },
  {
    q: "Where do the trucks run?",
    a: "The main lane is Southern California to Dallas, Texas, and Dallas back to Southern California.",
  },
  {
    q: "How do I request a rate?",
    a: "Use the quote form, call (413) 539-7319, or email info@rdrunnerusa.com. The desk replies during posted hours.",
  },
  {
    q: "Can I watch my load on a map here?",
    a: "Trucks are tracked with Verizon Connect. Send the load number on the tracking page and a dispatcher will reply. There is no public tracking login on this site.",
  },
  {
    q: "When is the office open?",
    a: "Monday through Friday, 7:00 AM to 11:00 PM EST. Saturday, 9:30 AM to 4:00 PM EST. Sunday hours are not posted.",
  },
  {
    q: "Where is the office?",
    a: "133 Greenbriar Drive, Matthews NC 28104. That is the dispatch and customer support office. It is not a stop on the California–Texas lane.",
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
    role: "Office",
    name: "Matthews, North Carolina",
    detail:
      "133 Greenbriar Drive, Matthews NC 28104. Dispatch and customer support. Not a point on the freight lane.",
  },
] as const;
