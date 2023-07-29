import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

// const post = g.model('Post', {
//   title: g.string(),
//   slug: g.string().unique(),
//   content: g.string().optional(),
//   publishedAt: g.datetime().optional(),
//   comments: g.relation(() => comment).optional().list().optional(),
//   likes: g.int().default(0),
//   tags: g.string().optional().list().length({ max: 5 }),
//   author: g.relation(() => user).optional()
// }).search()

// const comment = g.model('Comment', {
//   post: g.relation(post),
//   body: g.string(),
//   likes: g.int().default(0),
//   author: g.relation(() => user).optional()
// })
// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url().optional(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    calculations: g
      .relation(() => Calculation)
      .list()
      .optional(),

    // Extend models with resolvers
    // https://grafbase.com/docs/edge-gateway/resolvers
    // gravatar: g.url().resolver('user/gravatar')
  })
  .auth((rules) => {
    rules.public().read;
  });

// @ts-ignore
const Calculation = g
  .model("Calculation", {
    expression: g.string(),
    result: g.string(),
    calculatedBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read, rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: "3mHowxyeYR3Y0HwdphlMIT5/NdHBLhIygt9zz3s2F7M=",
});

export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [jwt],
  //   rules: (rules) => {
  //     rules.private();
  //   },
  // },
});
