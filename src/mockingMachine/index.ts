// index.ts
import { loadModules } from "../loadModules";
import { personApiMocks } from "./personApiMocks";
import type { MockingMachine, MocksTemplate } from "./mockingMachine";

// loadModules have to be above collectApiMocks()
loadModules("./lambdas/person/mocks");

function collectApiMocks<MocksArray extends MockingMachine<any>[]>(
    mocks: MocksArray,
) {
    return mocks.map((e) => e.build());
}

const mocks = collectApiMocks([personApiMocks]);

console.log("mocks: ", JSON.stringify(mocks, null, 2));

/*TODO: 
1. add WARN when same path with different parameters has been mocked
2. Fix inferred value of collectApiMocks
*/

