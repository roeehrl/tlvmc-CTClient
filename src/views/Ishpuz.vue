<template>
    <unit-view unit-id=""></unit-view>
</template>

<script>
    import UnitView from "./Unit";

    export default {
        data() {
            return {
                cards: [],
                table: {}
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {

                this.cards = [
                    {
                        "iconName": "bed",
                        "cardType": 1,
                        "value": 1047,
                        "text": "מאושפזים",
                        "showTrend": true,
                        "color": "#ec5656"
                    },
                    {
                        "percentage": 31,
                        "value": 4,
                        "cardType": 2,
                        "showTrend": true,
                        "text": "תפוסה כללית",
                        "color": "#34a9ff"
                    },
                    {
                        "value": 12,
                        "percentage": 45,
                        "cardType": 2,
                        "showTrend": true,
                        "text": "מונשמים",
                        "color": "#2dc9b9"
                    },
                    {
                        "value": 58,
                        "iconName": null,
                        "cardType": 1,
                        "showTrend": true,
                        "text": "מנשמים פנויים",
                        "color": "#34a9ff"
                    },
                    {
                        "value": 108,
                        "iconName": null,
                        "cardType": 1,
                        "showTrend": false,
                        "text": "מטופלים חשודים",
                        "color": "#2dc9b9"
                    }

                ];
                this.table = {
                    "header": [ "תפוסה", "מטופלים", "מונשמים", "מנשמים פנויים", "ממוצע ימי אשפוז", "צפויים להתדרדרות", "מוכנים לשחרור" ], // headers for table
                    "units": [
                        {
                            "unitId": 1622, //unit id for calling API with id on click
                            "unitName": "מחלקת בידוד מיוחד",
                            "unitSubText": "8 מאושפזים",
                            "color": "#ec5656",
                            "unitParams": [
                                { "paramId": 1, "cellText": "92%" }, //on cell click call api with paramid and unit id to show trend window
                                { "paramId": 2, "cellText": "8" },
                                { "paramId": 3, "cellText": "7", kpi: 0 },
                                { "paramId": 4, "cellText": "0" },
                                { "paramId": 5, "cellText": "3", kpi: 2 },
                                { "paramId": 6, "cellText": "-" },
                                { "paramId": 6, "cellText": "7" }
                            ]
                        },
                        {
                            "unitId": 1625,
                            "unitName": "טיפול נמרץ קורונה",
                            "unitSubText": "11 מאושפזים",
                            "color": "#34a9ff",
                            "unitParams": [
                                { "paramId": 1, "cellText": "70%", kpi: 1 },
                                { "paramId": 2, "cellText": "11" },
                                { "paramId": 3, "cellText": "3" },
                                { "paramId": 4, "cellText": "4" },
                                { "paramId": 5, "cellText": "2" },
                                { "paramId": 6, "cellText": "-" },
                                { "paramId": 6, "cellText": "8" }
                            ]
                        },
                        {
                            "unitId": 1626,
                            "unitName": "טיפול נמרץ פנימית א",
                            "unitSubText": "5 מאושפזים",
                            "color": "#2dc9b9",
                            "unitParams": [
                                {
                                    "paramId": 1,
                                    "cellText": "62%"
                                },
                                { "paramId": 2, "cellText": "5" },
                                { "paramId": 3, "cellText": "3" },
                                { "paramId": 4, "cellText": "3", kpi: 1 },
                                { "paramId": 5, "cellText": "9" },
                                { "paramId": 6, "cellText": "-" },
                                { "paramId": 6, "cellText": "1", kpi: 2 }
                            ]
                        },
                        {
                            "unitId": 1627,
                            "unitName": "טיפול נמרץ פנימית ח",
                            "unitSubText": "5 מאושפזים",
                            "color": "#ec5656",
                            "unitParams": [
                                {
                                    "paramId": 1,
                                    "cellText": "87%"
                                },
                                { "paramId": 2, "cellText": "5" },
                                { "paramId": 3, "cellText": "3" },
                                { "paramId": 4, "cellText": "3" },
                                { "paramId": 5, "cellText": "7" },
                                { "paramId": 6, "cellText": "-" },
                                { "paramId": 6, "cellText": "1", kpi: 1 }
                            ]
                        },
                        {
                            "unitId": 1629,
                            "unitName": "טיפול נמרץ פנימית ג",
                            "unitSubText": "2 מאושפזים",
                            "color": "#34a9ff",
                            "unitParams": [
                                {
                                    "paramId": 1,
                                    "cellText": "63%"
                                },
                                { "paramId": 2, "cellText": "2" },
                                { "paramId": 3, "cellText": "2" },
                                { "paramId": 4, "cellText": "7", kpi: 2 },
                                { "paramId": 5, "cellText": "13" },
                                { "paramId": 6, "cellText": "-" },
                                { "paramId": 6, "cellText": "0" }
                            ]
                        }
                    ]
                };
            }
        },
        components: {
            UnitView,

        }
    }
</script>
