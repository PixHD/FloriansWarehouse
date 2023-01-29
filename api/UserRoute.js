export default class UserRoute {
    static configRoutes(router) {
        router.route('/').get((req, res) => res.status(404).json({error: 'User not found'}));

        
        return router;
    }
}