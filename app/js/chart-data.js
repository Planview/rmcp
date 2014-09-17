'use strict';

define([], function () {
	return {
		views: ['cpPain', 'rmPain', 'busRisks'],
		defaultView: 'cpPain',
		cpPain: {
			type: "stacked", 
			name: "Capacity Planning Pain Points",
			data: [
				{
					shortName: "Overall",
					isDefault: true,
					isLocked: false,
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
				},
				{
					shortName: "IT/EPMO",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 87, title: "Low Maturity", id: 'low'}, {quantity: 60, title: "Medium Maturity", id: 'mid'}, {quantity: 59, title:"High Maturity", id: 'high'}],
					title: "IT/EPMO Capacity Planning Pain Points",
					dataset: [
						{
							id: "holisticView",
							title: "Lack of a combined, holistic view of both resource capacity and pipeline demand",
							data: [65, 36, 9] 
						},
						{
							id: "whatIf",
							title: "Unable to run what-if scenarios",
							data: [49, 32, 17]
						},
						{
							id: "pipelineDemand",
							title: "Insufficient visibility into pipeline demand",
							data: [46, 27, 8]
						},
						{
							id: "resourceCapacity",
							title: "Insufficient visibility into resource capacity",
							data: [67, 25, 8]
						},
						{
							id: "demandPrioritization",
							title: "Ineffective demand prioritization and governance process",
							data: [57, 21, 8]
						}
					],
					callout: true
				},
				{
					shortName: "Product Development",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 39, title: "Low Maturity", id: 'low'}, {quantity: 45, title: "Medium Maturity", id: 'mid'}, {quantity: 31, title:"High Maturity", id: 'high'}],
					title: "Product Development Capacity Planning Pain Points",
					dataset: [
						{
							id: "holisticView",
							title: "Lack of a combined, holistic view of both resource capacity and pipeline demand",
							data: [29, 23, 5] 
						},
						{
							id: "whatIf",
							title: "Unable to run what-if scenarios",
							data: [21, 24, 11]
						},
						{
							id: "pipelineDemand",
							title: "Insufficient visibility into pipeline demand",
							data: [25, 14, 7]
						},
						{
							id: "resourceCapacity",
							title: "Insufficient visibility into resource capacity",
							data: [30, 16, 2]
						},
						{
							id: "demandPrioritization",
							title: "Ineffective demand prioritization and governance process",
							data: [24, 18, 5]
						}
					],
					callout: true
				},
				{
					shortName: "Services Organizations",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 41, title: "Low Maturity", id: 'low'}, {quantity: 39, title: "Medium Maturity", id: 'mid'}, {quantity: 50, title:"High Maturity", id: 'high'}],
					title: "Services Organizations Capacity Planning Pain Points",
					dataset: [
						{
							id: "holisticView",
							title: "Lack of a combined, holistic view of both resource capacity and pipeline demand",
							data: [27, 20, 12] 
						},
						{
							id: "whatIf",
							title: "Unable to run what-if scenarios",
							data: [16, 15, 11]
						},
						{
							id: "pipelineDemand",
							title: "Insufficient visibility into pipeline demand",
							data: [21, 16, 17]
						},
						{
							id: "resourceCapacity",
							title: "Insufficient visibility into resource capacity",
							data: [20, 11, 4]
						},
						{
							id: "demandPrioritization",
							title: "Ineffective demand prioritization and governance process",
							data: [18, 15, 15]
						}
					],
					callout: true
				}
			]
		},
		rmPain: {
			type: "stacked", 
			name: "Resource Management Pain Points",
			data: [
				{
					shortName: "Overall",
					isDefault: true,
					isLocked: false,
					group: 0,
					sample: [{quantity: 480, title: "Total Sample", id:"total"}],
					title: "Resource Management Pain Points",
					dataset: [
						
						{
							id: "overcommited",
							title: "Over-committed resources",
							data: [273]
						},
						{
							id: "constantChange",
							title: "Constant change that affects assignments and availability",
							data: [243]
						},
						{
							id: "sharedResources",
							title: "Inability to prioritize shared resources",
							data: [203]
						},
						{
							id: "wrongEstimates",
							title: "Inaccurate resource estimates",
							data: [201]
						},
						{
							id: "realTime",
							title: "Inability to access real-time reports on resources",
							data: [176]
						},
						{
							id: "rightResources",
							title: "Inability to identify the right resources (roles, skills, etc) at the right time for project assignment",
							data: [107] 
						},
					],
					callout: false
				},
				{
					shortName: "By Maturity",
					isDefault: false,
					isLocked: true,
					group: 0,
					sample: [{quantity: 142, title: "Low Maturity", id: 'low'}, {quantity: 175, title: "Medium Maturity", id: 'mid'}, {quantity: 158, title:"High Maturity", id: 'high'}],
					title: "Resource Management Pain Points by Maturity Level",
					dataset: [
						{
							id: "overcommited",
							title: "Over-committed resources",
							data: [110, 98, 63]
						},
						{
							id: "constantChange",
							title: "Constant change that affects assignments and availability",
							data: [86, 95, 60]
						},
						{
							id: "sharedResources",
							title: "Inability to prioritize shared resources",
							data: [82, 82, 38]
						},
						{
							id: "wrongEstimates",
							title: "Inaccurate resource estimates",
							data: [83, 75, 42]
						},
						{
							id: "realTime",
							title: "Inability to access real-time reports on resources",
							data: [79, 64, 33]
						},
						{
							id: "rightResources",
							title: "Inability to identify the right resources (roles, skills, etc) at the right time for project assignment",
							data: [50, 35, 22] 
						}
					],
					callout: true
				},
				{
					shortName: "IT/EPMO",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 65, title: "Low Maturity", id: 'low'}, {quantity: 79, title: "Medium Maturity", id: 'mid'}, {quantity: 61, title:"High Maturity", id: 'high'}],
					title: "IT/EPMO Resource Management Pain Points",
					dataset: [
						{
							id: "overcommited",
							title: "Over-committed resources",
							data: [54, 50, 25]
						},
						{
							id: "constantChange",
							title: "Constant change that affects assignments and availability",
							data: [43, 47, 22]
						},
						{
							id: "sharedResources",
							title: "Inability to prioritize shared resources",
							data: [43, 45, 15]
						},
						{
							id: "wrongEstimates",
							title: "Inaccurate resource estimates",
							data: [39, 40, 17]
						},
						{
							id: "realTime",
							title: "Inability to access real-time reports on resources",
							data: [36, 30, 14]
						},
						{
							id: "rightResources",
							title: "Inability to identify the right resources (roles, skills, etc) at the right time for project assignment",
							data: [28, 22, 9] 
						}
					],
					callout: true
				},
				{
					shortName: "Product Development",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 39, title: "Low Maturity", id: 'low'}, {quantity: 47, title: "Medium Maturity", id: 'mid'}, {quantity: 28, title:"High Maturity", id: 'high'}],
					title: "Product Development Resource Management Pain Points",
					dataset: [
						{
							id: "overcommited",
							title: "Over-committed resources",
							data: [33, 31, 13]
						},
						{
							id: "constantChange",
							title: "Constant change that affects assignments and availability",
							data: [29, 23, 8]
						},
						{
							id: "sharedResources",
							title: "Inability to prioritize shared resources",
							data: [22, 20, 8]
						},
						{
							id: "wrongEstimates",
							title: "Inaccurate resource estimates",
							data: [30, 19, 6]
						},
						{
							id: "realTime",
							title: "Inability to access real-time reports on resources",
							data: [22, 16, 4]
						},
						{
							id: "rightResources",
							title: "Inability to identify the right resources (roles, skills, etc) at the right time for project assignment",
							data: [11, 5, 2] 
						}
					],
					callout: true
				},
				{
					shortName: "Services Organizations",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: [{quantity: 25, title: "Low Maturity", id: 'low'}, {quantity: 41, title: "Medium Maturity", id: 'mid'}, {quantity: 63, title:"High Maturity", id: 'high'}],
					title: "Services Organizations Resource Management Pain Points",
					dataset: [
						{
							id: "overcommited",
							title: "Over-committed resources",
							data: [14, 11, 24]
						},
						{
							id: "constantChange",
							title: "Constant change that affects assignments and availability",
							data: [6, 23, 30]
						},
						{
							id: "sharedResources",
							title: "Inability to prioritize shared resources",
							data: [12, 15, 15]
						},
						{
							id: "wrongEstimates",
							title: "Inaccurate resource estimates",
							data: [8, 14, 19]
						},
						{
							id: "realTime",
							title: "Inability to access real-time reports on resources",
							data: [14, 15, 13]
						},
						{
							id: "rightResources",
							title: "Inability to identify the right resources (roles, skills, etc) at the right time for project assignment",
							data: [5, 8, 10] 
						}
					],
					callout: true
				}
			]
		},
		busRisks: {
			type: "simple", 
			name: "RMCP Business Risks",
			data: [
				{
					shortName: "Overall",
					isDefault: true,
					isLocked: false,
					group: 0,
					sample: 480,
					title: "Business Risks of NOT Addressing Resource Management and Capacity Planning",
					set: "overall",
					dataset: [
						{"datum":219,"label":"Inability to complete projects on time"},
						{"datum":180,"label":"Missed business opportunities"},
						{"datum":174,"label":"Increased project costs"},
						{"datum":161,"label":"Inability to innovate fast enough"},
						{"datum":148,"label":"Dissatisfied customers or clients"},
						{"datum":146,"label":"Compromised quality affecting customer/client satisfaction"}
					]
				},
				{
					shortName: "IT/EPMO",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: 206,
					title: "IT Business Risks of NOT Addressing Resource Management and Capacity Planning",
					set: "it",
					dataset: [
						{"datum":118,"label":"Inability to complete projects on time"},
						{"datum":102,"label":"Increased project costs"},
						{"datum":71,"label":"Missed business opportunities"},
						{"datum":71,"label":"Inability to innovate fast enough"},
						{"datum":68,"label":"Dissatisfied customers or clients"},
						{"datum":63,"label":"Compromised quality affecting customer/client satisfaction"}
					],
				},
				{
					shortName: "Product Development",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: 116,
					title: "Product Development Business Risks of NOT Addressing Resource Management and Capacity Planning",
					set: "pd",
					dataset: [
						{"datum":62,"label":"Inability to complete projects on time"},
						{"datum":62,"label":"Inability to innovate fast enough"},
						{"datum":44,"label":"Missed business opportunities"},
						{"datum":30,"label":"Dissatisfied customers or clients"},
						{"datum":30,"label":"Compromised quality affecting customer/client satisfaction"},
						{"datum":29,"label":"Loss of revenue"}
					]
				},
				{
					shortName: "Services Organizations",
					isDefault: false,
					isLocked: true,
					group: 1,
					sample: 130,
					title: "Services Organizations Business Risks of NOT Addressing Resource Management and Capacity Planning",
					set: "services",
					dataset: [
						{"datum":55,"label":"Loss of revenue"},
						{"datum":54,"label":"Missed business opportunities"},
						{"datum":47,"label":"Dissatisfied customers or clients"},
						{"datum":47,"label":"Compromised quality affecting customer/client satisfaction"},
						{"datum":39,"label":"Increased project costs"},
						{"datum":32,"label":"Inability to complete projects on time"}
					]
				}
			]
		}
	}
});