TypeScript API Demo
===================

My Approach
-----------

I started by dividing up the problem into four major components/responsibilities:

1. A server to receive and route API requests to a controller
2. A controller that forms requests into a domain-specific query for the business logic layer
3. A business logic layer that does the heavy lifting of the problem: interpreting the query and performing the filtering and sorting
4. A CSV reader that turns the flat file into domain objects for the business logic layer to work with

The business logic layer is where the challenging problem lies; all the rest is wiring. So I decided to focus on that as the center of the design. It was critical that the interfaces on either side of it were sensible and easy to drop into a test harness. I spent the majority of my time deciding on how to lay out the interfaces and crafting the unit tests. When it could stand on its own, I set up the server in `server.ts` and resolved the dependencies, making a basic controller and shopping for a decent CSV reader.

Improve or additions
--------------------

* Tests for server
* Clean up controller test
* Come up with a better name for the business logic layer (`OrganizationData`)
* Refactor the `OrganizationData` tests for clarity

Getting it up and running
-------------------------

### Building

It's a Node.js project, so we'll need to start with the typical Node.js prep. First, either install the latest Node.js runtime or have `nvm` get it for you, using the `.nvmrc` file:

```console
nvm install
```

Now that we have the correct Node.js version, install the project's dependencies:

```console
npm install
```

### Running Tests

Run the Jest tests as you would for any other Node.js project:

```console
npm test
```

### Executing

Since this is a TypeScript project, the `start` script will also do a build prior to starting the server with `node`:

```console
npm start
```

### Exercising the API

You can reach the API via `localhost:3000`. For example: http://localhost:3000/organizations?category=Greek&city=Washington.
