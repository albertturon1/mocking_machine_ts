type Path = string;
type Segment = string;
type PathGroup = Path[];

// Function to group similar paths
export function groupSimilarPaths(incomingPath: string, groupedPaths: PathGroup[]): PathGroup[] {
    const segments = incomingPath.split('/').filter(segment => segment);
    let matchedGroup = false;

    for (const group of groupedPaths) {
        const firstInGroup = group[0]
        if (firstInGroup) {
            const exampleSegments = firstInGroup?.split('/').filter(segment => segment);

            if (exampleSegments.length === segments.length) {
                const allSegmentsMatch = exampleSegments.every((seg, index) => {
                    const v = segments[index]
                    if (!v) {
                        return false
                    }

                    return areSegmentsSimilar(seg, v)
                }
                );

                if (allSegmentsMatch) {
                    group.push(incomingPath);
                    matchedGroup = true;
                    break;
                }
            }
        }
    }

    if (!matchedGroup) {
        groupedPaths.push([incomingPath]);
    }

    return groupedPaths;
}

// Function to compare segments and check if they are similar
function areSegmentsSimilar(segment1: Segment, segment2: Segment): boolean {
    return segment1 === segment2 || !Number.isNaN(Number(segment1)) && !Number.isNaN(Number(segment2));
}
