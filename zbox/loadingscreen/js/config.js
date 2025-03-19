// ignore
var Config = {};

/**
 * Enable map text in the top left corner of the screen?
 */
Config.enableMap = true;

/**
 * Enable steamId text in the top right corner of the screen?
 */
Config.enableSteamID = false;

/**
 * Enable announcements?
 */
Config.enableAnnouncements = true;

/**
 * What messages do you want to show up?
 * only works if enableAnnouncements = true
 */
Config.announceMessages = [
    "Enjoy your stay!",
    "Don't forget to join the discord! discord.gg/npc",
    "Is a player breaking the rules? Report them in the discord!",
    "Look how fast you load in!",
    "A custom version of M9K for extra fun!",
    "Got any suggestions? Let us know in the discord!",
    "This is in fact a loading screen!",
    "Simplisticy is quality on its own",
    "Do people even read these?",
    "I sure hope so!",
];

/**
 * How many milliseconds for each announcement?
 * only works if enableAnnouncements = true
 */
Config.announcementLength = 3000;
