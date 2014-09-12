'use strict';

define([], function () {
	return {
		views: ['cpPain'],
		defaultView: 'cpPain',
		cpPain: {
			type: "stacked", 
			name: "Capacity Planning Pain Points",
			data: [
				{
					shortName: "Overall",
					isDefault: true,
					isLocked: true,
					group: 0,
					sample: [{quantity: 480, title: "Total Sample", id:"total"}],
					title: "Capacity Planning Pain Points",
					dataset: [
						{
							id: "holisticView",
							title: "Lack of a combined, holistic view of both resource capacity and pipeline demand",
							data: [241] 
						},
						{
							id: "whatIf",
							title: "Unable to run what-if scenarios",
							data: [208]
						},
						{
							id: "pipelineDemand",
							title: "Insufficient visibility into pipeline demand",
							data: [194]
						},
						{
							id: "resourceCapacity",
							title: "Insufficient visibility into resource capacity",
							data: [191]
						},			{
							id: "demandPrioritization",
							title: "Ineffective demand prioritization and governance process",
							data: [190]
						}
					],
					callout: false
				},
				{
					shortName: "By Maturity",
					isDefault: false,
					isLocked: true,
					group: 0,
					sample: [{quantity: 180, title: "Low Maturity", id: 'low'}, {quantity: 152, title: "Medium Maturity", id: 'mid'}, {quantity: 146, title:"High Maturity", id: 'high'}],
					title: "Capacity Planning Pain Points by Maturity Level",
					dataset: [
						{
							id: "holisticView",
							title: "Lack of a combined, holistic view of both resource capacity and pipeline demand",
							data: [130,82,28] 
						},
						{
							id: "whatIf",
							title: "Unable to run what-if scenarios",
							data: [94,73,40]
						},
						{
							id: "pipelineDemand",
							title: "Insufficient visibility into pipeline demand",
							data: [100,59,34]
						},
						{
							id: "resourceCapacity",
							title: "Insufficient visibility into resource capacity",
							data: [124,52,14]
						},
						{
							id: "demandPrioritization",
							title: "Ineffective demand prioritization and governance process",
							data: [103,57,29]
						}
					],
					callout: true
				}		
			]
		}
	}
});