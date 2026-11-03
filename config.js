/* ==========================================================
   GAMEDEV DRINKUP TLV — edit this file to update the site.
   Everything marked TODO is a placeholder waiting for real info.
   For a new event: update nextEvent below and replace images/cover.jpg
   with the new event cover (2:1 ratio, e.g. 1200x600).
   ========================================================== */
window.DRINKUP = {
  nextEvent: {
    // Start time in Israel time. Keep "+02:00" (winter) or "+03:00" (summer) at the end.
    // Set to null if the date isn't announced yet: the page will say "Date coming soon".
    start: "2026-11-12T20:00:00+02:00",
    end:   "2026-11-13T01:00:00+02:00",   // optional, used for "happening now"
    venue: "Schnitt",
    venueHe: "שניט",
    address: "HaArba'a St 12, Tel Aviv",
    addressHe: "הארבעה 12, תל אביב",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Schnitt%2C%20HaArba%27a%2012%2C%20Tel%20Aviv",
    // RSVP links for this event. Leave "" to show a greyed-out button.
    rsvp: {
      facebook: "https://www.facebook.com/events/1098985896255060",
      luma: "https://luma.com/shomecpw",
      meetup: ""   // TODO: Meetup event link
    }
  },

  // Community links. Leave "" to show the row as "soon"; delete a line to hide that row.
  // Possible keys: whatsapp, discord, facebook, luma (calendar), meetup (group).
  community: {
    whatsapp: "https://chat.whatsapp.com/GiWvNFXKStBCphLrCNKDMa",
    discord:  "https://discord.gg/YdjrYY2PjG",
    facebook: "https://www.facebook.com/groups/2059814290888269"
  }
};
