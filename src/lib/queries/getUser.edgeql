select User{*}
filter .username = <str>$username AND .host = <str>$host
limit 1