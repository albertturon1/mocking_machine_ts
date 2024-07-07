import { MockingMachine } from "./mockingMachine";

type PutPerson = {
	firstName: string;
	lastName: string;
	budget: number;
};

type GetPerson = PutPerson & {
	car: "Audi" | "BMW";
};

type Infra = {
	version: number;
	name: string;
};

//this will be generated from openapi
export type PersonApiMocks = {
	"/person/{id}/details": {
		Post: {
			200: Record<number, PutPerson>;
		};
		Get: {
			200: Record<number, GetPerson>;
		};
	};
	"/infra": {
		Get: {
			200: Record<number, Infra>;
		};
	};
};

export const personApiMocks = new MockingMachine<PersonApiMocks>(
	"personApi",
);
