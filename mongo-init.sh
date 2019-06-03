if [ "$MONGO_ROOT_USERNAME" ] && [ "$MONGO_ROOT_PASSWORD" ]; then
        mongo -- "$MONGO_INITDB_DATABASE" <<-EOJS
        db.createUser({
            user: '$MONGO_ROOT_USERNAME',
            pwd: '$MONGO_ROOT_PASSWORD',
            roles: [ "readWrite", "dbAdmin" ]
        })
EOJS
fi