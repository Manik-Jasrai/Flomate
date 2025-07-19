
export type FlowType = {
    id: string;
    name: string;
    triggerId: string;
    userId: number;
    trigger: {
      id: string;
      flowId: string;
      triggerId: string;
      type: {
        id: string;
        name: string;
      };
    };
    action: [{
      id: string;
      flowId: string;
      actionId: string;
      sortingOrder: number;
      metaData: Record<string, any>;
      type: {
        id: string;
        name: string;
		    dataRequired : string[];
      };
    }]
}

export type AvailableTriggerType = {
 	id : string;
	name : string;
}
export type AvailableActionType = {
    id : string;
    name : string;
    metadata : any;
    dataRequired : string[];
}

