import { personApiMocks } from "../../../mockingMachine/personApiMocks";

//thi will throw an error - "/person/1000/details" has already been mocked in "personMock"
personApiMocks.appendMock({
	"/person/1000/details": {
		Get: {
			"200": {
				0: {
					budget: 200,
					firstName: "Albert",
					lastName: "Turon",
					car: "Audi",
				},
			},
		},
	},
});
