#!/bin/bash
steamcmd +login anonymous +force_install_dir ./cs2 +quit
./cs2/game/cs2.sh -dedicated -usercon +sv_cheats 1 +map de_mirage +host_workshop_map 3070244462
