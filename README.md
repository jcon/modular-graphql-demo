# Scaling GraphQL Services Demos

This repository presents a series of Meetup-flavored examples of a GraphQL servers
that increasingly becomes more modular. The [presenation](./presentation), explains more about each step.

1. [Basic Monolith](./services/basic-monolith) Start with a simple monolithic server.
2. [Modular Monolith](./services/modular-monolith) Make GraphQL Schemas & Resolvers more modular.
3. [Federated Services](./services/federated) Instead of a single service, create a federated graph, with isolated schemas.

## Backend Services

In order to keep the demo concise, we re-use a couple of shared module that each GraphQL server example can leverage.
Each shared module provides a basic Service for fetching data of that entity type. For example, `Event` has an `EventService`, etc.

NOTE: We don't really make database calls, we just pretend with static data. This example is merely to show organization structure.

## Basic Monolith

The first example is a basic monolith modeling a simple Meetup domain, structured as you might commonly see an Apollo GraphQL
server structured in most examples online. The schema is organized by the shape of the real graph. References to other entities
are defined inline, and resolvers are implemented by refering to other entities "backend services."

### Running

```sh
cd services/basic-monolith
yarn
yarn start
```

You'll then be able to query the graph on http://localhost:4000


## Modular Monolith

The second example re-organizes the basic monolith to make it more modular. Rather than define the graph directly, we use `type extensions` to extend nodes in the Graph with additional data capabilities. We update our resolvers so that a given resolver can only access one entity service. For example, the `Event` resolver can only request data directly via the `EventService`.


### Running

```sh
cd services/modular-monolith
yarn
yarn start
```

You'll then be able to query the graph on http://localhost:4000

## Federated Server

The third example uses an Apollo Federated GraphQL server to connect three GraphQL microservices that are each scoped to one entity. This approach approves on the modularity introduced by the second example so that each service is completely independent of one another. Each service only needs to know how to identitfy related entities. The federated server is then able to resolve the query to the appropriate backend service.

### Running

In Terminal One:
```sh
cd services/federated
yarn start-services
```

In Terminal Two:
```sh
cd services/federated
yarn start-gateway
```

You'll see the primary graph located at http://localhost:4000
You'll see the individual services running at http://localhost:4001, http://localhost:4002, http://localhost:4003.
