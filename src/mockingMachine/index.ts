// index.ts
import { loadModules } from "../loadModules";
import { personApiMocks } from "./personApiMocks";
import type { MockingMachine, MocksTemplate } from "./mockingMachine";

// loadModules have to be above collectApiMocks()
loadModules("./lambdas/person/mocks");

function collectApiMocks<const MocksArray extends MockingMachine<MocksTemplate>[]>(
    mocks: MocksArray,
) {
    return mocks.map((e) => e.build());
}

const mocks = collectApiMocks([personApiMocks]);

console.log("mocks: ", JSON.stringify(mocks, null, 2));
