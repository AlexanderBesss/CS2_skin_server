# CS2 server with skins
This project aims to simplify configuration process of CS2 server with skins.
It supports linux (tested) and windows server configuration.

## Software requirements
 - Docker v28+
 - Node.js v22+

## Configuration
Follow those steps in order to configure the server:
1. **[OPTIONAL]** `npm run game:update`: update or download CS2 game files.
2. `npm run plugins:install`: download all required software/plugins.
3. Start and then stop the server, execute `./linux_aimbot.sh` or `./windows_aimbotz.bat` depends on your OS. It will generate some files by plugins.

**Note:** In some linux distro cssharp isn't installed properly, to fix this you need to run:

`sudo apt-get install patchelf
patchelf --clear-execstack ./cs2/game/csgo/addons/counterstrikesharp/bin/linuxsteamrt64/counterstrikesharp.so`

4. `npm run plugins:configure`: it will configure all plugins. The default configuration will work on localhost. Check .env file for more granular configuration.
5. **[OPTIONAL]** `npm run plugins:uninstall`: if you want remove all plugins from the server.




