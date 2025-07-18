/* 
currAction.metadata {"To":"{comment.email}","Body":"Happy to tell you {comment.name} that you are great"}
flowRunMetaData -> values { comment: { name: 'Billu Bansal', email: 'jasraimanik@gmail.com' } }
*/

export const parse = (metadata : string, values : any, startDelimiter = '{', endDelimeter = '}') : string => {
    // We need to parse metadata and then replace {...} with its approprite value

    let finalString = "";
    let start = 0;
    let end = 0;
    while(end < metadata.length) {
        if (metadata[start] != startDelimiter) {
            finalString += metadata[start]
            start++;
            end++;
        } else {
            while (metadata[end] !== endDelimeter) {    
                end++;
            }
            // replace
            const objectValue = metadata.slice(start+1, end);
            
            const keys = objectValue.split('.');
            let localValues = {...values}
            
            for(let i = 0;i<keys.length;i++) {
                if (typeof localValues === "string") {
                    localValues = JSON.parse(localValues)
                }
                localValues = localValues[keys[i]]
                
            }
            finalString += localValues

            start = end+1;
            end++;
        }
    }

    return finalString
}