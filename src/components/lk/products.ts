import madrid from "@/assets/jersey-madrid.png";
import barca from "@/assets/jersey-barca.png";
import city from "@/assets/jersey-city.png";
import psg from "@/assets/jersey-psg.png";
import lakers from "@/assets/jersey-lakers.png";
import liverpool from "@/assets/jersey-liverpool.png";
import united from "@/assets/jersey-united.png";
import arsenal from "@/assets/jersey-arsenal.png";
import bayern from "@/assets/jersey-bayern.png";
import inter from "@/assets/jersey-inter.png";
import bulls from "@/assets/jersey-bulls.png";

// New high-resolution generated assets
import chelsea from "@/assets/jersey-chelsea.png";
import acmilan from "@/assets/jersey-acmilan.png";
import juventus from "@/assets/jersey-juventus.png";
import napoli from "@/assets/jersey-napoli.png";
import argentina from "@/assets/jersey-argentina.png";
import bullsRetro from "@/assets/jersey-bulls-retro.png";

// Modern high-resolution generated assets
import tottenham from "@/assets/jersey-tottenham.png";
import dortmund from "@/assets/jersey-dortmund.png";
import leverkusen from "@/assets/jersey-leverkusen.png";
import atletico from "@/assets/jersey-atletico.png";
import roma from "@/assets/jersey-roma.png";
import marseille from "@/assets/jersey-marseille.png";
import ajax from "@/assets/jersey-ajax.png";
import celtic from "@/assets/jersey-celtic.png";
import boca from "@/assets/jersey-boca.png";
import river from "@/assets/jersey-river.png";
import brazil from "@/assets/jersey-brazil.png";
import france from "@/assets/jersey-france.png";
import italy from "@/assets/jersey-italy.png";
import germany from "@/assets/jersey-germany.png";
import england from "@/assets/jersey-england.png";
import spain from "@/assets/jersey-spain.png";
import portugal from "@/assets/jersey-portugal.png";

// New mapped assets
import newcastle from "@/assets/jersey-newcastle.png";
import astonvilla from "@/assets/jersey-astonvilla.png";
import sevilla from "@/assets/jersey-sevilla.png";
import valencia from "@/assets/jersey-valencia.png";
import benfica from "@/assets/jersey-benfica.png";
import porto from "@/assets/jersey-porto.png";
import celtics from "@/assets/jersey-celtics.png";
import heat from "@/assets/jersey-heat.png";
import knicks from "@/assets/jersey-knicks.png";
import bucks from "@/assets/jersey-bucks.png";
import seventySixers from "@/assets/jersey-76ers.png";
import warriors from "@/assets/jersey-warriors.png";
import mavericks from "@/assets/jersey-mavericks.png";
import suns from "@/assets/jersey-suns.png";
import spurs from "@/assets/jersey-spurs.png";
import nuggets from "@/assets/jersey-nuggets.png";
import nets from "@/assets/jersey-nets.png";

export type Category = "football" | "nba";
export type JerseyPattern = "solid" | "stripes" | "hoops" | "sash" | "center-stripe" | "psg-bar" | "boca-band" | "nba";

export interface PlayerVariant {
  name: string;
  number: string;
}

export interface Product {
  id: string;
  title: string;
  team: string;
  teamSlug: string;
  teamHe: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  image?: string;
  players?: PlayerVariant[];
  era?: string;
  description?: string;
  isRetro?: boolean;
  badge?: string;
  eraPeriod?: "90s" | "00s" | "10s" | "modern";
  jerseyPattern?: JerseyPattern;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface TeamInfo {
  slug: string;
  name: string;
  nameHe: string;
  category: Category;
  league: string;
  leagueShort: string;
  primaryColor: string;
  secondaryColor: string;
  abbrev: string;
  description: string;
  image?: string;
  currentPlayers?: PlayerVariant[];
  jerseyPattern: JerseyPattern;
  officialLogoUrl: string;
}

// ── TEAMS ──────────────────────────────────────────────────────────────────

export const TEAMS: TeamInfo[] = [
  // Premier League
  { slug: "manchester-city", name: "Manchester City FC", nameHe: "מנצ׳סטר סיטי", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#6CABDD", secondaryColor: "#1C2C5B", abbrev: "MCI", description: "The Citizens — אלופי האנגלייה. חולצות עונה נוכחית ורטרו.", image: city, currentPlayers: [{ name: "הולאנד", number: "9" }, { name: "דה ברויינה", number: "17" }, { name: "פיל פודן", number: "47" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { slug: "arsenal", name: "Arsenal FC", nameHe: "ארסנל", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#EF0107", secondaryColor: "#063672", abbrev: "ARS", description: "The Gunners — ארסנל FC. The Invincibles.", image: arsenal, currentPlayers: [{ name: "סאקה", number: "7" }, { name: "מרטינלי", number: "11" }, { name: "אודגאר", number: "8" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { slug: "liverpool", name: "Liverpool FC", nameHe: "ליברפול", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#C8102E", secondaryColor: "#00B2A9", abbrev: "LIV", description: "You'll Never Walk Alone. רגע איסטנבול 2005.", image: liverpool, currentPlayers: [{ name: "סלאח", number: "11" }, { name: "נונז", number: "9" }, { name: "טרנט", number: "66" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { slug: "manchester-united", name: "Manchester United FC", nameHe: "מנצ׳סטר יונייטד", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#DA291C", secondaryColor: "#FBE122", abbrev: "MUN", description: "The Red Devils. טרבל 1999.", image: united, currentPlayers: [{ name: "רשפורד", number: "10" }, { name: "הוילונד", number: "11" }, { name: "מאונט", number: "7" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
  { slug: "chelsea", name: "Chelsea FC", nameHe: "צ׳לסי", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#034694", secondaryColor: "#EE242C", abbrev: "CHE", description: "The Blues — קולקציה עשירה מהעשור הכחול.", image: chelsea, currentPlayers: [{ name: "פאלמר", number: "20" }, { name: "פודריצ׳קה", number: "10" }, { name: "ג׳קסון", number: "15" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
  { slug: "tottenham", name: "Tottenham Hotspur FC", nameHe: "טוטנהאם", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#132257", secondaryColor: "#FFFFFF", abbrev: "TOT", description: "Spurs — White Hart Lane עד Tottenham Hotspur Stadium.", image: tottenham, currentPlayers: [{ name: "סון", number: "7" }, { name: "מדיסון", number: "10" }, { name: "ריצ׳ארליסון", number: "9" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
  { slug: "newcastle", name: "Newcastle United FC", nameHe: "ניוקאסל יונייטד", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#241F20", secondaryColor: "#FFFFFF", abbrev: "NEW", description: "The Magpies — שחור-לבן מניוקאסל.", image: newcastle, currentPlayers: [{ name: "איסאק", number: "14" }, { name: "ג׳וקי ווילסון", number: "7" }, { name: "בריונו גימאראאש", number: "39" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" },
  { slug: "aston-villa", name: "Aston Villa FC", nameHe: "אסטון וילה", category: "football", league: "Premier League", leagueShort: "EPL", primaryColor: "#670E36", secondaryColor: "#95BFE5", abbrev: "AVL", description: "Villa — בגוון הקלאסי חזרת ללגת האלופות.", image: astonvilla, currentPlayers: [{ name: "ווטקינס", number: "11" }, { name: "ברנסברוד", number: "20" }, { name: "מקגין", number: "7" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg" },
  // La Liga
  { slug: "real-madrid", name: "Real Madrid CF", nameHe: "ריאל מדריד", category: "football", league: "La Liga", leagueShort: "LaLiga", primaryColor: "#FEBE10", secondaryColor: "#00529F", abbrev: "RMA", description: "Los Blancos — 14 גביעי Champions League.", image: madrid, currentPlayers: [{ name: "ויניציוס", number: "7" }, { name: "מבאפה", number: "9" }, { name: "בלינגהאם", number: "5" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { slug: "barcelona", name: "FC Barcelona", nameHe: "ברצלונה", category: "football", league: "La Liga", leagueShort: "LaLiga", primaryColor: "#A50044", secondaryColor: "#004D98", abbrev: "FCB", description: "Més que un club. עידן מסי, שאבי, איניסטה.", image: barca, currentPlayers: [{ name: "יאמאל", number: "19" }, { name: "לוונה", number: "9" }, { name: "פדרי", number: "8" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona.svg" },
  { slug: "atletico-madrid", name: "Atlético de Madrid", nameHe: "אטלטיקו מדריד", category: "football", league: "La Liga", leagueShort: "LaLiga", primaryColor: "#CB3524", secondaryColor: "#272E61", abbrev: "ATM", description: "Los Rojiblancos — אלופי ספרד 2014, 2021.", image: atletico, currentPlayers: [{ name: "גריזמן", number: "7" }, { name: "מורטה", number: "9" }, { name: "דה-פאול", number: "5" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
  { slug: "sevilla", name: "Sevilla FC", nameHe: "סביליה", category: "football", league: "La Liga", leagueShort: "LaLiga", primaryColor: "#D61F2A", secondaryColor: "#FFFFFF", abbrev: "SEV", description: "6 גביעי UEFA — הקבוצה האייקונית של אנדלוסיה.", image: sevilla, currentPlayers: [{ name: "לוקה מיליבויביץ׳", number: "19" }, { name: "אן-נסירי", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg" },
  { slug: "valencia", name: "Valencia CF", nameHe: "ולנסיה", category: "football", league: "La Liga", leagueShort: "LaLiga", primaryColor: "#FF8000", secondaryColor: "#000000", abbrev: "VLC", description: "Los Murciélagos — הכוח הכתום מולנסיה.", image: valencia, currentPlayers: [{ name: "דיאס", number: "7" }, { name: "גאייה", number: "14" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/1/1b/Valencia_CF_logo.svg" },
  // Serie A
  { slug: "juventus", name: "Juventus FC", nameHe: "יובנטוס", category: "football", league: "Serie A", leagueShort: "Serie A", primaryColor: "#000000", secondaryColor: "#FFFFFF", abbrev: "JUV", description: "La Vecchia Signora — 36 אליפויות. The Bianconeri.", image: juventus, currentPlayers: [{ name: "ולחוביץ׳", number: "9" }, { name: "טשאוויה", number: "10" }, { name: "קמביאסו", number: "7" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg" },
  { slug: "ac-milan", name: "AC Milan", nameHe: "אי.סי. מילאן", category: "football", league: "Serie A", leagueShort: "Serie A", primaryColor: "#FB090B", secondaryColor: "#000000", abbrev: "ACM", description: "I Rossoneri — 7 גביעי Champions League.", image: acmilan, currentPlayers: [{ name: "לאו", number: "10" }, { name: "ג׳ירו", number: "9" }, { name: "טיאו", number: "23" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" },
  { slug: "inter-milan", name: "FC Internazionale Milano", nameHe: "אינטר מילאן", category: "football", league: "Serie A", leagueShort: "Serie A", primaryColor: "#0068A8", secondaryColor: "#000000", abbrev: "INT", description: "I Nerazzurri — טרבל 2010.", image: inter, currentPlayers: [{ name: "לאוטרו מרטינס", number: "10" }, { name: "ת׳ורם", number: "9" }, { name: "ברוסארד׳ו", number: "77" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021_logo.svg" },
  { slug: "as-roma", name: "AS Roma", nameHe: "אס רומא", category: "football", league: "Serie A", leagueShort: "Serie A", primaryColor: "#8E1F2F", secondaryColor: "#F0BC42", abbrev: "ROM", description: "I Giallorossi — הלב של רומא.", image: roma, currentPlayers: [{ name: "דיבאלה", number: "21" }, { name: "לוקאקו", number: "11" }, { name: "מנצ׳יני", number: "8" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f4/AS_Roma_logo_%282013%29.svg" },
  { slug: "napoli", name: "SSC Napoli", nameHe: "נאפולי", category: "football", league: "Serie A", leagueShort: "Serie A", primaryColor: "#087AC3", secondaryColor: "#FFFFFF", abbrev: "NAP", description: "Gli Azzurri — עידן מרדונה ועידן אוסימהן.", image: napoli, currentPlayers: [{ name: "קוואראצ׳לייה", number: "77" }, { name: "לוקאקו", number: "11" }, { name: "לוזאנו", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/SSC_Napoli_2024.svg" },
  // Bundesliga
  { slug: "bayern-munich", name: "FC Bayern Munich", nameHe: "באיירן מינכן", category: "football", league: "Bundesliga", leagueShort: "Bundesliga", primaryColor: "#DC052D", secondaryColor: "#FFFFFF", abbrev: "FCB", description: "Die Roten — UCL 2013.", image: bayern, currentPlayers: [{ name: "קיין", number: "9" }, { name: "מוסיאלה", number: "42" }, { name: "קינגסלי קומן", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { slug: "dortmund", name: "Borussia Dortmund", nameHe: "בורוסיה דורטמונד", category: "football", league: "Bundesliga", leagueShort: "Bundesliga", primaryColor: "#FDE100", secondaryColor: "#000000", abbrev: "BVB", description: "Die Schwarzgelben — Signal Iduna Park. אלופי 2011, 2012.", image: dortmund, currentPlayers: [{ name: "גיטה", number: "10" }, { name: "פולסן", number: "9" }, { name: "ראוס", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { slug: "leverkusen", name: "Bayer 04 Leverkusen", nameHe: "בייר לברקוזן", category: "football", league: "Bundesliga", leagueShort: "Bundesliga", primaryColor: "#E32221", secondaryColor: "#000000", abbrev: "B04", description: "Die Werkself — אלופי גרמניה 2023/24 ללא הפסד.", image: leverkusen, currentPlayers: [{ name: "גרנית שקה", number: "10" }, { name: "ווירץ", number: "10" }, { name: "הופמן", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg" },
  // Ligue 1
  { slug: "psg", name: "Paris Saint-Germain", nameHe: "פריז סן ז׳רמן", category: "football", league: "Ligue 1", leagueShort: "Ligue 1", primaryColor: "#003370", secondaryColor: "#DA291C", abbrev: "PSG", description: "PSG — הכוח הצרפתי.", image: psg, currentPlayers: [{ name: "דמבלה", number: "10" }, { name: "אשראף", number: "2" }, { name: "לי קאנג-אין", number: "19" }], jerseyPattern: "psg-bar", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
  { slug: "marseille", name: "Olympique de Marseille", nameHe: "מרסיי", category: "football", league: "Ligue 1", leagueShort: "Ligue 1", primaryColor: "#00A5DE", secondaryColor: "#FFFFFF", abbrev: "OM", description: "L'OM — UCL 1993. הקבוצה הצרפתית עם הכי הרבה אוהדים.", image: marseille, currentPlayers: [{ name: "ונדרסון", number: "8" }, { name: "אוליביה", number: "9" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg" },
  // Rest of World
  { slug: "ajax", name: "AFC Ajax", nameHe: "אייאקס", category: "football", league: "Rest of World", leagueShort: "Eredivisie", primaryColor: "#D2122E", secondaryColor: "#FFFFFF", abbrev: "AJX", description: "Ajax — UCL 1995. Factory of Talent.", image: ajax, currentPlayers: [{ name: "ברגוויין", number: "11" }, { name: "גרייסון", number: "9" }], jerseyPattern: "center-stripe", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/7/79/AFC_Ajax_logo.svg" },
  { slug: "benfica", name: "SL Benfica", nameHe: "בנפיקה", category: "football", league: "Rest of World", leagueShort: "Primeira Liga", primaryColor: "#E52214", secondaryColor: "#FFFFFF", abbrev: "SLB", description: "As Águias — 2 גביעי UCL.", image: benfica, currentPlayers: [{ name: "דיאס", number: "6" }, { name: "רמוס", number: "9" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg" },
  { slug: "porto", name: "FC Porto", nameHe: "פורטו", category: "football", league: "Rest of World", leagueShort: "Primeira Liga", primaryColor: "#003F87", secondaryColor: "#FFFFFF", abbrev: "POR", description: "Os Dragões — UCL 2004 עם מורינייו.", image: porto, currentPlayers: [{ name: "גלנו", number: "7" }, { name: "ה׳ישם", number: "9" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg" },
  { slug: "celtic", name: "Celtic FC", nameHe: "סלטיק", category: "football", league: "Rest of World", leagueShort: "Scottish Premiership", primaryColor: "#005F27", secondaryColor: "#FFFFFF", abbrev: "CEL", description: "The Hoops — UCL 1967 Lisbon Lions.", image: celtic, currentPlayers: [{ name: "הטה", number: "9" }, { name: "יוקוסו", number: "7" }], jerseyPattern: "hoops", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/3/35/Celtic_FC_crest.svg" },
  { slug: "boca-juniors", name: "Boca Juniors", nameHe: "בוקה ג׳וניורס", category: "football", league: "Rest of World", leagueShort: "Primera División", primaryColor: "#003DA5", secondaryColor: "#FFC20E", abbrev: "BOC", description: "Los Xeneizes — מרדונה, ריקלמה, La Bombonera.", image: boca, currentPlayers: [{ name: "מייה", number: "10" }, { name: "בנדניי", number: "9" }], jerseyPattern: "boca-band", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Club_Atl%C3%A9tico_Boca_Juniors_logo.svg" },
  { slug: "river-plate", name: "Club Atlético River Plate", nameHe: "ריבר פלייט", category: "football", league: "Rest of World", leagueShort: "Primera División", primaryColor: "#D41B2C", secondaryColor: "#FFFFFF", abbrev: "RIV", description: "Los Millonarios — Copa Libertadores 2015, 2018, 2019.", image: river, currentPlayers: [{ name: "ביולה", number: "10" }, { name: "אלבארס", number: "9" }], jerseyPattern: "sash", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Escudo_del_C_A_River_Plate.svg" },
  { slug: "santos", name: "Santos FC", nameHe: "סאנטוס", category: "football", league: "Rest of World", leagueShort: "Série A (Brasil)", primaryColor: "#000000", secondaryColor: "#FFFFFF", abbrev: "SAN", description: "Santos FC — בית של פלה ונייאר.", currentPlayers: [{ name: "ריקאס", number: "10" }, { name: "ד׳אנדרה", number: "9" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_FC_logo.svg" },
  // National Teams
  { slug: "brazil", name: "Brazil National Team", nameHe: "ברזיל", category: "football", league: "National Teams", leagueShort: "Seleção", primaryColor: "#FEDF00", secondaryColor: "#009B3A", abbrev: "BRA", description: "5 גביעי עולם — הסלסאו. ויניציוס, רודריגו, וינה.", image: brazil, currentPlayers: [{ name: "ויניציוס ג׳וניור", number: "7" }, { name: "רודריגו", number: "11" }, { name: "ריצ׳רליסון", number: "9" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Brazilian_Football_Confederation_logo.svg" },
  { slug: "argentina", name: "Argentina National Team", nameHe: "ארגנטינה", category: "football", league: "National Teams", leagueShort: "Selección", primaryColor: "#75AADB", secondaryColor: "#FFFFFF", abbrev: "ARG", description: "3 גביעי עולם — מסי, מרדונה. אלופי העולם 2022.", image: argentina, currentPlayers: [{ name: "מסי", number: "10" }, { name: "לאוטרו מרטינס", number: "22" }, { name: "דה-פאול", number: "7" }], jerseyPattern: "stripes", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_de_la_Asociaci%C3%B3n_del_F%C3%BAtbol_Argentino.svg" },
  { slug: "france", name: "France National Team", nameHe: "צרפת", category: "football", league: "National Teams", leagueShort: "Les Bleus", primaryColor: "#002395", secondaryColor: "#DA291C", abbrev: "FRA", description: "2 גביעי עולם — זידאן, מבאפה. אלופי 1998.", image: france, currentPlayers: [{ name: "מבאפה", number: "10" }, { name: "גריזמן", number: "7" }, { name: "דמבלה", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/France_national_football_team_crest.svg" },
  { slug: "italy", name: "Italy National Team", nameHe: "איטליה", category: "football", league: "National Teams", leagueShort: "Azzurri", primaryColor: "#003DA5", secondaryColor: "#FFFFFF", abbrev: "ITA", description: "4 גביעי עולם, אלופי אירופה 2021. Gli Azzurri.", image: italy, currentPlayers: [{ name: "קיסה", number: "10" }, { name: "ראספאדורי", number: "9" }, { name: "ג׳יגי דונרומה", number: "1" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/FIGC_logo_2023.svg" },
  { slug: "germany", name: "Germany National Team", nameHe: "גרמניה", category: "football", league: "National Teams", leagueShort: "Mannschaft", primaryColor: "#FFFFFF", secondaryColor: "#000000", abbrev: "GER", description: "4 גביעי עולם — Die Mannschaft.", image: germany, currentPlayers: [{ name: "מוסיאלה", number: "10" }, { name: "קיין", number: "9" }, { name: "גונדוגן", number: "8" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Germany_DFB_crest.svg" },
  { slug: "england", name: "England National Team", nameHe: "אנגליה", category: "football", league: "National Teams", leagueShort: "Three Lions", primaryColor: "#FFFFFF", secondaryColor: "#CF081F", abbrev: "ENG", description: "Three Lions — אלופי 1966. בלינגהאם, סאקה, פודן.", image: england, currentPlayers: [{ name: "בלינגהאם", number: "10" }, { name: "סאקה", number: "7" }, { name: "פודן", number: "10" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/8/8b/England_national_football_team_crest.svg" },
  { slug: "spain", name: "Spain National Team", nameHe: "ספרד", category: "football", league: "National Teams", leagueShort: "La Roja", primaryColor: "#AA151B", secondaryColor: "#F1BF00", abbrev: "ESP", description: "La Roja — 2 גביעי עולם, 3 תארי אירופה.", image: spain, currentPlayers: [{ name: "יאמאל", number: "19" }, { name: "מוראטה", number: "9" }, { name: "פדרי", number: "26" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/Spain_National_Football_Team_badge.svg" },
  { slug: "portugal", name: "Portugal National Team", nameHe: "פורטוגל", category: "football", league: "National Teams", leagueShort: "Seleção", primaryColor: "#D51C1D", secondaryColor: "#006600", abbrev: "POR", description: "אלופי אירופה 2016 — CR7, פפה, ברנרדו סילבה.", image: portugal, currentPlayers: [{ name: "רונאלדו", number: "7" }, { name: "ברנרדו סילבה", number: "10" }, { name: "לאו פלקס", number: "11" }], jerseyPattern: "solid", officialLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Portuguese_Football_Federation_crest.svg" },
  // NBA - Eastern Conference
  { slug: "bulls", name: "Chicago Bulls", nameHe: "שיקגו בולס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#CE1141", secondaryColor: "#000000", abbrev: "CHI", description: "The Last Dance — 6 אליפויות NBA.", image: bulls, currentPlayers: [{ name: "LaVine", number: "8" }, { name: "DeRozan", number: "11" }, { name: "Vucevic", number: "9" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg" },
  { slug: "celtics", name: "Boston Celtics", nameHe: "בוסטון סלטיקס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#007A33", secondaryColor: "#FFFFFF", abbrev: "BOS", description: "18 אליפויות — הצבא הירוק. Bird, Pierce, Tatum.", image: celtics, currentPlayers: [{ name: "Tatum", number: "0" }, { name: "Brown", number: "7" }, { name: "Horford", number: "42" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg" },
  { slug: "heat", name: "Miami Heat", nameHe: "מיאמי היט", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#98002E", secondaryColor: "#F9A01B", abbrev: "MIA", description: "Miami Heat Culture — Wade, LeBron, Bosh Big 3.", image: heat, currentPlayers: [{ name: "Butler", number: "22" }, { name: "Herro", number: "14" }, { name: "Bam Adebayo", number: "13" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg" },
  { slug: "knicks", name: "New York Knicks", nameHe: "ניו יורק ניקס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#006BB6", secondaryColor: "#F58426", abbrev: "NYK", description: "Orange and Blue — MSG, הקבוצה של ניו יורק.", image: knicks, currentPlayers: [{ name: "Brunson", number: "11" }, { name: "Randle", number: "30" }, { name: "OG Anunoby", number: "8" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg" },
  { slug: "bucks", name: "Milwaukee Bucks", nameHe: "מילווקי באקס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#00471B", secondaryColor: "#EEE1C6", abbrev: "MIL", description: "The Deer District — Giannis Antetokounmpo.", image: bucks, currentPlayers: [{ name: "Giannis", number: "34" }, { name: "Lillard", number: "0" }, { name: "Portis", number: "8" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg" },
  { slug: "76ers", name: "Philadelphia 76ers", nameHe: "פילדלפיה 76ארס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#006BB6", secondaryColor: "#ED174C", abbrev: "PHI", description: "The Process — Allen Iverson, Embiid.", image: seventySixers, currentPlayers: [{ name: "Embiid", number: "21" }, { name: "Maxey", number: "0" }, { name: "Oubre Jr.", number: "8" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg" },
  { slug: "cavaliers", name: "Cleveland Cavaliers", nameHe: "קלבלנד קבלרס", category: "nba", league: "Eastern Conference", leagueShort: "NBA East", primaryColor: "#860038", secondaryColor: "#FDBB30", abbrev: "CLE", description: "The Wine and Gold — LeBron James, 2016 Championship.", currentPlayers: [{ name: "Mitchell", number: "45" }, { name: "Garland", number: "10" }, { name: "Mobley", number: "4" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg" },
  // NBA - Western Conference
  { slug: "lakers", name: "Los Angeles Lakers", nameHe: "לוס אנג׳לס לייקרס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#FDB927", secondaryColor: "#552583", abbrev: "LAL", description: "17 אליפויות — Kobe, Magic, Shaq, LeBron.", image: lakers, currentPlayers: [{ name: "LeBron", number: "23" }, { name: "A.Davis", number: "3" }, { name: "Reaves", number: "15" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg" },
  { slug: "warriors", name: "Golden State Warriors", nameHe: "גולדן סטייט ווריורס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#1D428A", secondaryColor: "#FFC72C", abbrev: "GSW", description: "Strength in Numbers — Curry Dynasty.", image: warriors, currentPlayers: [{ name: "Curry", number: "30" }, { name: "Wiggins", number: "22" }, { name: "Green", number: "23" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg" },
  { slug: "mavericks", name: "Dallas Mavericks", nameHe: "דאלאס מבריקס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#00538C", secondaryColor: "#002B5E", abbrev: "DAL", description: "The Mavs — Nowitzki 2011, Dončić era.", image: mavericks, currentPlayers: [{ name: "Dončić", number: "77" }, { name: "Irving", number: "11" }, { name: "P.J.Washington", number: "25" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg" },
  { slug: "suns", name: "Phoenix Suns", nameHe: "פיניקס סאנס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#1D1160", secondaryColor: "#E56020", abbrev: "PHX", description: "Valley Boys — Nash, Barkley, Kevin Durant era.", image: suns, currentPlayers: [{ name: "Durant", number: "35" }, { name: "Booker", number: "1" }, { name: "Bradley Beal", number: "3" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg" },
  { slug: "spurs", name: "San Antonio Spurs", nameHe: "סן אנטוניו ספארס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#C0C0C0", secondaryColor: "#000000", abbrev: "SAS", description: "Silver & Black — Dynasty: 5 אליפויות. Duncan, Parker, Ginobili.", image: spurs, currentPlayers: [{ name: "Wembanyama", number: "1" }, { name: "Johnson", number: "9" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg" },
  { slug: "rockets", name: "Houston Rockets", nameHe: "יוסטון רוקטס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#CE1141", secondaryColor: "#C4CED4", abbrev: "HOU", description: "Clutch City — Olajuwon x2, Harden era.", currentPlayers: [{ name: "Jalen Green", number: "4" }, { name: "Šengün", number: "28" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg" },
  { slug: "nuggets", name: "Denver Nuggets", nameHe: "דנבר נאגטס", category: "nba", league: "Western Conference", leagueShort: "NBA West", primaryColor: "#0E2240", secondaryColor: "#FEC524", abbrev: "DEN", description: "Mile High City — אלופים 2023. Jokić, Murray.", image: nuggets, currentPlayers: [{ name: "Jokić", number: "15" }, { name: "Murray", number: "27" }, { name: "Porter Jr.", number: "1" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg" },
  { slug: "nets", name: "Brooklyn Nets", nameHe: "ברוקלין נטס", category: "nba", league: "Western Conference", leagueShort: "NBA East", primaryColor: "#000000", secondaryColor: "#FFFFFF", abbrev: "BKN", description: "Brooklyn — KD, Kyrie, Harden superteam era.", image: nets, currentPlayers: [{ name: "Ben Simmons", number: "10" }, { name: "Bridges", number: "1" }], jerseyPattern: "nba", officialLogoUrl: "https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg" },
];

// ── RETRO ERAS ─────────────────────────────────────────────────────────────

interface RetroEra {
  teamSlug: string;
  id: string;
  titleHe: string;
  era: string;
  eraPeriod: "90s" | "00s" | "10s" | "modern";
  description: string;
  players: PlayerVariant[];
  image?: string;
  jerseyPattern?: JerseyPattern;
}

const RETRO_ERAS: RetroEra[] = [
  // ── Football ──
  { teamSlug: "real-madrid", id: "rm-retro-2002", titleHe: "ריאל מדריד · רטרו 2002", era: "2002 · עידן זידאן", eraPeriod: "00s", description: "גמר UCL 2002 — הגול של זידאן בשאנטיאגו ברנאבאו. Los Galácticos.", players: [{ name: "זידאן", number: "5" }, { name: "רונאלדו", number: "9" }, { name: "ראול", number: "7" }, { name: "פיגו", number: "10" }], jerseyPattern: "solid" },
  { teamSlug: "real-madrid", id: "rm-retro-2018", titleHe: "ריאל מדריד · רטרו 2018", era: "2016-2018 · 3-Peat", eraPeriod: "10s", description: "3 גביעי UCL רצופים — CR7, בייל, בנזמה. ההישג הגדול ביותר.", players: [{ name: "רונאלדו", number: "7" }, { name: "בנזמה", number: "9" }, { name: "בייל", number: "11" }, { name: "מודריץ׳", number: "10" }], jerseyPattern: "solid" },
  { teamSlug: "barcelona", id: "fcb-retro-2009", titleHe: "ברצלונה · רטרו 2009", era: "2009 · Treble Season", eraPeriod: "00s", description: "עונת 2008/09 — הטרבל של גוארדיולה. 6 גביעים, שנה שכולה היסטוריה.", players: [{ name: "מסי", number: "10" }, { name: "שאבי", number: "6" }, { name: "איניסטה", number: "8" }, { name: "הנרי", number: "14" }], jerseyPattern: "stripes" },
  { teamSlug: "barcelona", id: "fcb-retro-2015", titleHe: "ברצלונה · רטרו 2015", era: "2015 · MSN Treble", eraPeriod: "10s", description: "MSN — מסי, סואריס, נייאר. טרבל נוסף, השלישייה האגדית.", players: [{ name: "מסי", number: "10" }, { name: "נייאר", number: "11" }, { name: "סואריס", number: "9" }, { name: "איניסטה", number: "8" }], jerseyPattern: "stripes" },
  { teamSlug: "arsenal", id: "ars-retro-2004", titleHe: "ארסנל · רטרו 2004", era: "2004 · The Invincibles", eraPeriod: "00s", description: "38 משחקים ללא הפסד. The Invincibles של ארסגר ונגר — ההישג הבלתי מנוצח.", players: [{ name: "הנרי", number: "14" }, { name: "ברגקאמפ", number: "10" }, { name: "וייאה", number: "4" }, { name: "פירס", number: "3" }], jerseyPattern: "solid" },
  { teamSlug: "manchester-united", id: "mufc-retro-1999", titleHe: "מנצ׳סטר יונייטד · רטרו 1999", era: "1999 · The Treble", eraPeriod: "90s", description: "פרמייר ליג, FA Cup ו-UCL באותה עונה. טרבל פרגוסון — אגדה.", players: [{ name: "בקהאם", number: "7" }, { name: "גיגס", number: "11" }, { name: "שולס", number: "18" }, { name: "קיין", number: "16" }], jerseyPattern: "solid" },
  { teamSlug: "liverpool", id: "lfc-retro-2005", titleHe: "ליברפול · רטרו 2005", era: "2005 · Istanbul Miracle", eraPeriod: "00s", description: "גמר UCL — 0:3 בהפסקה, 3:3 בסיום ו-3:2 בפנדלים. The Miracle of Istanbul.", players: [{ name: "גרארד", number: "8" }, { name: "אלונסו", number: "14" }, { name: "מלו", number: "9" }, { name: "סמי הייא", number: "4" }], jerseyPattern: "solid" },
  { teamSlug: "chelsea", id: "che-retro-2012", titleHe: "צ׳לסי · רטרו 2012", era: "2012 · UCL Champions", eraPeriod: "10s", description: "UCL 2012 — ניצחון על בייר מינכן בבייארנה. Drogba 88' + הצלה בפנדלים.", players: [{ name: "דרוגבה", number: "11" }, { name: "למפארד", number: "8" }, { name: "טרי", number: "26" }, { name: "מאטה", number: "10" }], image: chelsea, jerseyPattern: "solid" },
  { teamSlug: "ac-milan", id: "acm-retro-1994", titleHe: "אי.סי. מילאן · רטרו 1994", era: "1988-1994 · Grande Milan", eraPeriod: "90s", description: "הדינסטי הגדול — UCL 1989, 1990, 1994. גולה, ון באסטן, מלדיני.", players: [{ name: "גולה", number: "10" }, { name: "ון באסטן", number: "9" }, { name: "מלדיני", number: "3" }, { name: "קוסטה", number: "11" }], image: acmilan, jerseyPattern: "stripes" },
  { teamSlug: "inter-milan", id: "int-retro-2010", titleHe: "אינטר מילאן · רטרו 2010", era: "2010 · Mourinho Treble", eraPeriod: "10s", description: "טרבל 2010 עם מורינייו — Serie A, Coppa Italia ו-UCL. La Grande Inter.", players: [{ name: "מיליטו", number: "22" }, { name: "זאנטי", number: "4" }, { name: "אטו", number: "9" }, { name: "סנטי", number: "19" }], jerseyPattern: "stripes" },
  { teamSlug: "napoli", id: "nap-retro-1987", titleHe: "נאפולי · רטרו 1987", era: "1987-1990 · Maradona Era", eraPeriod: "90s", description: "מרדונה בנאפולי — Serie A 1987, 1990, UEFA Cup 1989. הדרום קם לחיים.", players: [{ name: "מרדונה", number: "10" }, { name: "ג׳יורדנו", number: "9" }, { name: "פרארה", number: "6" }], image: napoli, jerseyPattern: "solid" },
  { teamSlug: "juventus", id: "juv-retro-1996", titleHe: "יובנטוס · רטרו 1996", era: "1996-2003 · Del Piero Era", eraPeriod: "90s", description: "UCL 1996 עם ליפי — Baggio, Del Piero, Zidane. La Vecchia Signora בשיאה.", players: [{ name: "דל פיירו", number: "10" }, { name: "ז׳ידאן", number: "21" }, { name: "ינה", number: "9" }, { name: "קאמוראנזי", number: "8" }], image: juventus, jerseyPattern: "stripes" },
  { teamSlug: "dortmund", id: "bvb-retro-2012", titleHe: "בורוסיה דורטמונד · רטרו 2012", era: "2011-2013 · Klopp Era", eraPeriod: "10s", description: "Bundesliga 2011, 2012 — הקלופ שלפני ליברפול. Signal Iduna Park בלהבות.", players: [{ name: "לבנדובסקי", number: "9" }, { name: "ראוס", number: "11" }, { name: "גוצ׳ה", number: "10" }, { name: "הומלס", number: "15" }], jerseyPattern: "solid" },
  { teamSlug: "bayern-munich", id: "bay-retro-2013", titleHe: "באיירן מינכן · רטרו 2013", era: "2013 · Wembley Final", eraPeriod: "10s", description: "UCL 2013 — גמר כולו גרמני, וומבלי. רובן, ריברי, מולר.", players: [{ name: "רובן", number: "10" }, { name: "ריברי", number: "7" }, { name: "לבנדובסקי", number: "9" }, { name: "נוייר", number: "1" }], jerseyPattern: "solid" },
  { teamSlug: "psg", id: "psg-retro-2015", titleHe: "PSG · רטרו 2015", era: "2015 · Ibrahimović Era", eraPeriod: "10s", description: "עידן זלאטן — ארבע Ligue 1 רצופות. Si vous ne l'aimez pas, partez!", players: [{ name: "איברהימוביץ׳", number: "18" }, { name: "לוקאס מורה", number: "29" }, { name: "ואנה", number: "19" }], jerseyPattern: "psg-bar" },
  { teamSlug: "ajax", id: "ajx-retro-1995", titleHe: "אייאקס · רטרו 1995", era: "1995 · UCL Champions", eraPeriod: "90s", description: "UCL 1995 — Louis van Gaal. The Dream Team — Davids, Seedorf, Kluivert, De Boer.", players: [{ name: "דיוידס", number: "8" }, { name: "קלוייברט", number: "17" }, { name: "סידורף", number: "11" }, { name: "דה בואר", number: "3" }], jerseyPattern: "center-stripe" },
  // National Teams Retro
  { teamSlug: "brazil", id: "bra-retro-2002", titleHe: "ברזיל · רטרו 2002", era: "2002 · WC Pentacampeão", eraPeriod: "00s", description: "מונדיאל 2002 — 3R: ריבאלדו, רונאלדינייו, רונאלדו. הטוב ביותר של ברזיל.", players: [{ name: "רונאלדו", number: "9" }, { name: "רונאלדינייו", number: "11" }, { name: "ריבאלדו", number: "10" }, { name: "רוברטו קרלוס", number: "6" }], jerseyPattern: "solid" },
  { teamSlug: "brazil", id: "bra-retro-1970", titleHe: "ברזיל · רטרו 1970", era: "1970 · Pelé's WC", eraPeriod: "modern", description: "מונדיאל 1970 — פלה, טוסטאו, ז׳יאירזינייו. הנבחרת הטובה ביותר בהיסטוריה.", players: [{ name: "פלה", number: "10" }, { name: "ז׳יאירזינייו", number: "7" }, { name: "טוסטאו", number: "9" }], jerseyPattern: "solid" },
  { teamSlug: "argentina", id: "arg-retro-1986", titleHe: "ארגנטינה · רטרו 1986", era: "1986 · Maradona WC", eraPeriod: "modern", description: "מונדיאל מקסיקו 1986 — יד האלוהים + הגול של המאה. מרדונה הבלתי ניתן לעצירה.", players: [{ name: "מרדונה", number: "10" }, { name: "ואלדנו", number: "9" }, { name: "ברגסיו", number: "7" }], image: argentina, jerseyPattern: "stripes" },
  { teamSlug: "argentina", id: "arg-retro-2022", titleHe: "ארגנטינה · רטרו 2022", era: "2022 · Messi's WC", eraPeriod: "modern", description: "מונדיאל קטאר 2022 — מסי שם שוויון. הטרי פינאל האגדית מול צרפת.", players: [{ name: "מסי", number: "10" }, { name: "דיבאלה", number: "21" }, { name: "דה-פאול", number: "7" }, { name: "לאוטרו", number: "22" }], jerseyPattern: "stripes" },
  { teamSlug: "france", id: "fra-retro-1998", titleHe: "צרפת · רטרו 1998", era: "1998 · WC Champions", eraPeriod: "90s", description: "מונדיאל 1998 על האדמה הצרפתית — זידאן ×2 בגמר. Allez les Bleus!", players: [{ name: "זידאן", number: "10" }, { name: "הנרי", number: "14" }, { name: "טרזגה", number: "20" }, { name: "בארתז", number: "1" }], jerseyPattern: "solid" },
  { teamSlug: "boca-juniors", id: "boc-retro-2000", titleHe: "בוקה ג׳וניורס · רטרו 2000", era: "2000 · Copa Libertadores", eraPeriod: "00s", description: "Copa Libertadores 2000 — ריקלמה ובוקה בגרסה הכי אגדית שלהם. La Bombonera.", players: [{ name: "ריקלמה", number: "10" }, { name: "מרטין פלמינו", number: "9" }, { name: "הורגה", number: "7" }], jerseyPattern: "boca-band" },
  // NBA Retro
  { teamSlug: "bulls", id: "chi-retro-96", titleHe: "בולס · רטרו 1996", era: "1996 · The Last Dance", eraPeriod: "90s", description: "72-10 בסדרה הסדירה. The Last Dance — הדוקומנטרי, המיתוס, ג׳ורדן.", players: [{ name: "Jordan", number: "23" }, { name: "Pippen", number: "33" }, { name: "Rodman", number: "91" }, { name: "Kukoc", number: "7" }], image: bullsRetro, jerseyPattern: "nba" },
  { teamSlug: "bulls", id: "chi-retro-92", titleHe: "בולס · רטרו 1992", era: "1992 · 3-Peat First Run", eraPeriod: "90s", description: "Three-Peat ראשון — 1991, 1992, 1993. Jordan & Pippen Dominant.", players: [{ name: "Jordan", number: "23" }, { name: "Pippen", number: "33" }, { name: "Grant", number: "54" }], jerseyPattern: "nba" },
  { teamSlug: "lakers", id: "lal-retro-2000", titleHe: "לייקרס · רטרו 2000", era: "2000-2002 · Kobe/Shaq 3-Peat", eraPeriod: "00s", description: "Three-Peat 2000-2002 — Kobe & Shaq. The Purple and Gold Dynasty.", players: [{ name: "Kobe Bryant", number: "8" }, { name: "Shaquille O'Neal", number: "34" }, { name: "Fish", number: "2" }], jerseyPattern: "nba" },
  { teamSlug: "lakers", id: "lal-retro-87", titleHe: "לייקרס · רטרו 1987", era: "1987 · Showtime Lakers", eraPeriod: "modern", description: "Showtime Lakers — Magic Johnson, Kareem, Worthy. 5 אליפויות בשנות ה-80.", players: [{ name: "Magic Johnson", number: "32" }, { name: "Kareem Abdul-Jabbar", number: "33" }, { name: "James Worthy", number: "42" }], jerseyPattern: "nba" },
  { teamSlug: "celtics", id: "bos-retro-1986", titleHe: "סלטיקס · רטרו 1986", era: "1986 · Celtic Pride", eraPeriod: "modern", description: "עונת 1985/86 — Larry Bird. 67 ניצחונות. הנבחרת שנחשבת לטובה בהיסטוריה.", players: [{ name: "Larry Bird", number: "33" }, { name: "Kevin McHale", number: "32" }, { name: "Robert Parish", number: "00" }], jerseyPattern: "nba" },
  { teamSlug: "celtics", id: "bos-retro-2008", titleHe: "סלטיקס · רטרו 2008", era: "2008 · Big Three", eraPeriod: "00s", description: "ה-Big Three — Pierce, Garnett, Allen. 66 ניצחונות ואליפות 2008.", players: [{ name: "Paul Pierce", number: "34" }, { name: "Kevin Garnett", number: "5" }, { name: "Ray Allen", number: "20" }], jerseyPattern: "nba" },
  { teamSlug: "heat", id: "mia-retro-2013", titleHe: "מיאמי היט · רטרו 2013", era: "2012-2013 · LeBron Era", eraPeriod: "10s", description: "LeBron, Wade, Bosh — 2 אליפויות רצופות. South Beach Dynasty.", players: [{ name: "LeBron James", number: "6" }, { name: "Dwyane Wade", number: "3" }, { name: "Chris Bosh", number: "1" }], jerseyPattern: "nba" },
  { teamSlug: "warriors", id: "gsw-retro-2017", titleHe: "ווריורס · רטרו 2017", era: "2017 · Dynasty Edition", eraPeriod: "10s", description: "Curry + Durant — 16-1 בפלייאוף. The All-Time Greatest Regular Season Team.", players: [{ name: "Stephen Curry", number: "30" }, { name: "Kevin Durant", number: "35" }, { name: "Klay Thompson", number: "11" }], jerseyPattern: "nba" },
  { teamSlug: "spurs", id: "sas-retro-2005", titleHe: "ספארס · רטרו 2005", era: "2003-2007 · Big Three", eraPeriod: "00s", description: "Duncan, Parker, Ginobili — The Big Fundamental. 4 אליפויות ב-9 שנים.", players: [{ name: "Tim Duncan", number: "21" }, { name: "Tony Parker", number: "9" }, { name: "Manu Ginobili", number: "20" }], jerseyPattern: "nba" },
  { teamSlug: "rockets", id: "hou-retro-1994", titleHe: "רוקטס · רטרו 1994", era: "1994-1995 · Back-to-Back", eraPeriod: "90s", description: "Back-to-Back — Hakeem The Dream 1994, 1995. 2 גביעים ב-2 שנים.", players: [{ name: "Hakeem Olajuwon", number: "34" }, { name: "Clyde Drexler", number: "22" }, { name: "Cassell", number: "10" }], jerseyPattern: "nba" },
  { teamSlug: "mavericks", id: "dal-retro-2011", titleHe: "מבריקס · רטרו 2011", era: "2011 · Nowitzki's Championship", eraPeriod: "10s", description: "Nowitzki's Miracle — ניצחון על LeBron's Heat. Finals MVP בגיל 32.", players: [{ name: "Dirk Nowitzki", number: "41" }, { name: "Jason Terry", number: "31" }, { name: "Jason Kidd", number: "5" }], jerseyPattern: "nba" },
  { teamSlug: "knicks", id: "nyk-retro-1994", titleHe: "ניקס · רטרו 1994", era: "1994 · Ewing Era", eraPeriod: "90s", description: "Patrick Ewing, MSG בלהבות. Finals 1994 — הפסד בגמר לרוקטס בפנדלים.", players: [{ name: "Patrick Ewing", number: "33" }, { name: "John Starks", number: "3" }, { name: "Charles Oakley", number: "34" }], jerseyPattern: "nba" },
];

// ── GENERATE PRODUCTS ──────────────────────────────────────────────────────

interface CustomKitConfig {
  away?: {
    primaryColor: string;
    secondaryColor: string;
    pattern?: JerseyPattern;
  };
  third?: {
    primaryColor: string;
    secondaryColor: string;
    pattern?: JerseyPattern;
  };
}

const CUSTOM_KITS: Record<string, CustomKitConfig> = {
  "manchester-city": {
    away: { primaryColor: "#0F1E36", secondaryColor: "#D2FD47", pattern: "solid" },
    third: { primaryColor: "#3A1225", secondaryColor: "#F3CF5D", pattern: "solid" }
  },
  "arsenal": {
    away: { primaryColor: "#111111", secondaryColor: "#E5A93B", pattern: "solid" },
    third: { primaryColor: "#6299B2", secondaryColor: "#EC7E9F", pattern: "solid" }
  },
  "liverpool": {
    away: { primaryColor: "#F0EDE9", secondaryColor: "#0F3A33", pattern: "solid" },
    third: { primaryColor: "#1F2426", secondaryColor: "#00E3CD", pattern: "solid" }
  },
  "manchester-united": {
    away: { primaryColor: "#0A1C2E", secondaryColor: "#18A3B5", pattern: "solid" },
    third: { primaryColor: "#FFFFFF", secondaryColor: "#DA291C", pattern: "solid" }
  },
  "chelsea": {
    away: { primaryColor: "#F7F5F0", secondaryColor: "#EE242C", pattern: "solid" },
    third: { primaryColor: "#121212", secondaryColor: "#FF1493", pattern: "solid" }
  },
  "tottenham": {
    away: { primaryColor: "#A3BDD0", secondaryColor: "#132257", pattern: "solid" },
    third: { primaryColor: "#1A252C", secondaryColor: "#F0F0F0", pattern: "solid" }
  },
  "real-madrid": {
    away: { primaryColor: "#FF6600", secondaryColor: "#111111", pattern: "solid" },
    third: { primaryColor: "#2A2D34", secondaryColor: "#E5C158", pattern: "solid" }
  },
  "barcelona": {
    away: { primaryColor: "#111111", secondaryColor: "#004D98", pattern: "solid" },
    third: { primaryColor: "#CCFF00", secondaryColor: "#A50044", pattern: "stripes" }
  },
  "atletico-madrid": {
    away: { primaryColor: "#0F2847", secondaryColor: "#FFFFFF", pattern: "solid" },
    third: { primaryColor: "#00533C", secondaryColor: "#F3CF5D", pattern: "solid" }
  },
  "juventus": {
    away: { primaryColor: "#FFDD00", secondaryColor: "#003399", pattern: "solid" },
    third: { primaryColor: "#1E1F29", secondaryColor: "#D4AF37", pattern: "solid" }
  },
  "ac-milan": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#FB090B", pattern: "solid" },
    third: { primaryColor: "#3A6073", secondaryColor: "#FB090B", pattern: "solid" }
  },
  "inter-milan": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#0068A8", pattern: "solid" },
    third: { primaryColor: "#FFD700", secondaryColor: "#000000", pattern: "solid" }
  },
  "as-roma": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#8E1F2F", pattern: "solid" },
    third: { primaryColor: "#1C1C1C", secondaryColor: "#F0BC42", pattern: "solid" }
  },
  "napoli": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#087AC3", pattern: "solid" },
    third: { primaryColor: "#152438", secondaryColor: "#FFFFFF", pattern: "solid" }
  },
  "bayern-munich": {
    away: { primaryColor: "#1B1C1E", secondaryColor: "#FC5A34", pattern: "solid" },
    third: { primaryColor: "#FCFBF7", secondaryColor: "#8B0000", pattern: "solid" }
  },
  "dortmund": {
    away: { primaryColor: "#111111", secondaryColor: "#FDE100", pattern: "solid" },
    third: { primaryColor: "#FFFFFF", secondaryColor: "#000000", pattern: "solid" }
  },
  "leverkusen": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#E32221", pattern: "solid" },
    third: { primaryColor: "#1E2B38", secondaryColor: "#FFFFFF", pattern: "solid" }
  },
  "psg": {
    away: { primaryColor: "#FFFFFF", secondaryColor: "#003370", pattern: "psg-bar" },
    third: { primaryColor: "#C2B280", secondaryColor: "#111111", pattern: "solid" }
  },
  "marseille": {
    away: { primaryColor: "#0F2D3A", secondaryColor: "#00A5DE", pattern: "solid" },
    third: { primaryColor: "#E5C583", secondaryColor: "#0F2D3A", pattern: "solid" }
  },
};

function generateCurrentProductsForTeam(team: TeamInfo): Product[] {
  const isFootball = team.category === "football";

  // 1. Home Kit (uses ${team.slug}-24 for backward compatibility with carts and orders)
  const homeKit: Product = {
    id: `${team.slug}-24`,
    title: isFootball ? `${team.nameHe} · חולצת בית 2025/26` : `${team.nameHe} · גופיית בית 2025/26`,
    team: team.name,
    teamSlug: team.slug,
    teamHe: team.nameHe,
    category: team.category,
    categoryLabel: team.category === "football" ? "כדורגל" : "גופיות NBA",
    price: 70,
    originalPrice: 150,
    image: team.image,
    players: team.currentPlayers,
    badge: "חולצת בית",
    eraPeriod: "modern",
    jerseyPattern: team.jerseyPattern,
    primaryColor: team.primaryColor,
    secondaryColor: team.secondaryColor,
  };

  // 2. Away Kit
  let awayPrimary = "#FFFFFF";
  let awaySecondary = team.primaryColor;
  let awayPattern = team.jerseyPattern;

  if (team.category === "nba") {
    // NBA Icon Edition (Away) is usually the team's primary color
    awayPrimary = team.primaryColor;
    awaySecondary = team.secondaryColor;
    awayPattern = "nba";
  } else {
    // Custom football away config
    const custom = CUSTOM_KITS[team.slug]?.away;
    if (custom) {
      awayPrimary = custom.primaryColor;
      awaySecondary = custom.secondaryColor;
      awayPattern = custom.pattern ?? team.jerseyPattern;
    } else {
      // Default fallback: White with primary color accent
      if (team.primaryColor.toLowerCase() === "#ffffff") {
        awayPrimary = team.secondaryColor !== "#FFFFFF" ? team.secondaryColor : "#121212";
        awaySecondary = "#FFFFFF";
      } else {
        awayPrimary = "#FFFFFF";
        awaySecondary = team.primaryColor;
      }
      awayPattern = "solid";
    }
  }

  const awayKit: Product = {
    id: `${team.slug}-away`,
    title: isFootball ? `${team.nameHe} · חולצת חוץ 2025/26` : `${team.nameHe} · גופיית חוץ 2025/26`,
    team: team.name,
    teamSlug: team.slug,
    teamHe: team.nameHe,
    category: team.category,
    categoryLabel: team.category === "football" ? "כדורגל" : "גופיות NBA",
    price: 70,
    originalPrice: 150,
    players: team.currentPlayers,
    badge: isFootball ? "חולצת חוץ" : "גופיית חוץ",
    eraPeriod: "modern",
    jerseyPattern: awayPattern,
    primaryColor: awayPrimary,
    secondaryColor: awaySecondary,
  };

  // 3. Third Kit
  let thirdPrimary = "#121212";
  let thirdSecondary = team.secondaryColor !== "#FFFFFF" ? team.secondaryColor : team.primaryColor;
  let thirdPattern: JerseyPattern = isFootball ? "solid" : "nba";

  if (team.category === "nba") {
    thirdPrimary = "#1A1A1A";
    thirdSecondary = team.secondaryColor !== "#FFFFFF" ? team.secondaryColor : team.primaryColor;
    thirdPattern = "nba";
  } else {
    // Custom football third config
    const custom = CUSTOM_KITS[team.slug]?.third;
    if (custom) {
      thirdPrimary = custom.primaryColor;
      thirdSecondary = custom.secondaryColor;
      thirdPattern = custom.pattern ?? "solid";
    } else {
      // Default fallback: Dark black/grey with secondary accent
      thirdPrimary = "#121212";
      thirdSecondary = team.secondaryColor !== "#FFFFFF" && team.secondaryColor !== "#000000" 
        ? team.secondaryColor 
        : team.primaryColor;
      thirdPattern = "solid";
    }
  }

  const thirdKit: Product = {
    id: `${team.slug}-third`,
    title: isFootball ? `${team.nameHe} · חולצה שלישית 2025/26` : `${team.nameHe} · גופייה שלישית 2025/26`,
    team: team.name,
    teamSlug: team.slug,
    teamHe: team.nameHe,
    category: team.category,
    categoryLabel: team.category === "football" ? "כדורגל" : "גופיות NBA",
    price: 70,
    originalPrice: 150,
    players: team.currentPlayers,
    badge: isFootball ? "חולצה שלישית" : "גופייה אלטרנטיבית",
    eraPeriod: "modern",
    jerseyPattern: thirdPattern,
    primaryColor: thirdPrimary,
    secondaryColor: thirdSecondary,
  };

  return [homeKit, awayKit, thirdKit];
}

function retroProduct(era: RetroEra, team: TeamInfo): Product {
  return {
    id: era.id,
    title: era.titleHe,
    team: team.name,
    teamSlug: era.teamSlug,
    teamHe: team.nameHe,
    category: team.category,
    categoryLabel: `${team.category === "football" ? "כדורגל" : "NBA"} · רטרו`,
    price: 70,
    originalPrice: 150,
    image: era.image ?? team.image,
    players: era.players,
    era: era.era,
    description: era.description,
    isRetro: true,
    badge: "רטרו קלאסיק",
    eraPeriod: era.eraPeriod,
    jerseyPattern: era.jerseyPattern ?? team.jerseyPattern,
  };
}

const currentProducts: Product[] = TEAMS.flatMap(generateCurrentProductsForTeam);

const retroProducts: Product[] = RETRO_ERAS.map((era) => {
  const team = TEAMS.find((t) => t.slug === era.teamSlug)!;
  return retroProduct(era, team);
});

export const PRODUCTS: Product[] = [...currentProducts, ...retroProducts];

// ── UTILS ─────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "972508100032";
export const INSTAGRAM_URL = "https://www.instagram.com/legendary_kits7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export function buildWhatsAppUrl(text: string) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppLink(product: Product, size: string, player?: PlayerVariant) {
  const playerLine = player ? `👤 שחקן: ${player.name} #${player.number}\n` : "";
  const msg =
`שלום LEGENDARY KITS! ✨
אני רוצה להזמין:

👕 פריט: ${product.title}
${playerLine}📏 מידה: ${size}
💰 מחיר השקה: ${product.price} ₪

אשמח לסגור פרטי משלוח ותשלום.`;
  return buildWhatsAppUrl(msg);
}
