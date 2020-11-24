// import { setupServer } from 'msw/node';

// const server = setupServer(
//     rest.get('https://heidan-api.herokuapp.com/activities', (req, res, ctx ) => {
//         return res(ctx.status(200), ctx.json({
//             "complete": false,
//             "cost": 5000.0,
//             "description": "Destroying scrubs",
//             "id": 4,
//             "location": "Summoner's Rift",
//             "name": "Valorant"
//           }));
//     })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.close());
// afterEach(() => server.resetHandlers());
