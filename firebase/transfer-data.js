var uuid = require('node-uuid');

var json = [
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVfV9DepqvRn4ZB9p_bb",
      "_score": 1,
      "_source": {
         "name": "熊天晨🐻",
         "phone": "7809071534",
         "email": "txiong@ualebrta.ca",
         "avatar": "images/tutors/tianchen.png",
         "intro": "BMO 风险分析师, 2年tutor经验",
         "courses": [
            "FIN 301",
            "FIN 391",
            "CMPUT 291"
         ]
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjL7OLtVfGFJxAMZE0",
      "_score": 1,
      "_source": {
         "name": "易超绝",
         "phone": "7807164880",
         "email": "chaojue@ualberta.ca",
         "avatar": "images/tutors/yichaoqun.png",
         "courses": [
            "MATH 114",
            "MATH 115",
            "MATH 125",
            "MATH 214",
            "MATH 225",
            "MATH 241",
            "STAT 151",
            "PHYS 124"
         ],
         "intro": "UA工程博士，2年tutor经验，曾教授过100+名学生，均取得优异的成绩。不论是基础巩固，还是强化拔高，学生均能在愉快，幽默又不失严谨的氛围中，取得满意的效果。",
         "appointment": "提前一天预约",
         "availableTime": "Workdays: 下午4点以后, Weekend: 全天, 可根据学生具体需求适当修改",
         "rates": [
            {
               "name": "1",
               "rate": 40
            },
            {
               "name": "2",
               "rate": 35
            },
            {
               "name": "3",
               "rate": 30
            },
            {
               "name": "4",
               "rate": 25
            }
         ],
         "maxStudents": "4"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjNU1NtVfGFJxAMZE2",
      "_score": 1,
      "_source": {
         "name": "宋启航",
         "phone": "7802632826",
         "email": "qihang1@ualberta.ca",
         "avatar": "images/tutors/songqihang.jpg",
         "courses": [
            "MATH 100",
            "MATH 101",
            "CHEM 103",
            "ENGG 130",
            "ENPH 131"
         ],
         "intro": "2年tutor经验，国内普高毕业，从高三毕业开始担任家教，所教学生从初一到高三并取得优良成绩。对理科和工科有独特的思路和见解。",
         "appointment": "提前三天预约",
         "availableTime": "周一到周五晚7点后，周六周日晚六点后",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "2",
               "rate": 30
            }
         ],
         "maxStudents": "2"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjQOjetVfGFJxAMZE5",
      "_score": 1,
      "_source": {
         "name": "季文颖",
         "phone": "7807102886",
         "email": "jwyseu@gmail.com",
         "avatar": "images/tutors/jiwenying.jpg",
         "courses": [
            "MATH 114",
            "MATH 115",
            "MATH 125",
            "MATH 240",
            "MATH 373",
            "STAT 151",
            "STAT 252"
         ],
         "intro": "3年tutor经验，曾教授超百名学生，其他课程请咨询.",
         "appointment": "提前三天预约",
         "availableTime": "周一至周五16:00 – 20:00, 周六 全天",
         "rates": [
            {
               "name": "1, Level 1",
               "rate": 40
            },
            {
               "name": "1, Level 2",
               "rate": 45
            },
            {
               "name": "1, Level 3",
               "rate": 50
            },
            {
               "name": "多, Level 1",
               "rate": 25
            },
            {
               "name": "多, Level 2",
               "rate": 30
            },
            {
               "name": "多, Level 3",
               "rate": 35
            }
         ],
         "maxStudents": "1+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjPFMAtVfGFJxAMZE4",
      "_score": 1,
      "_source": {
         "name": "刘静",
         "phone": "7807290898",
         "email": "liujing.seu@gmail.com",
         "avatar": "images/tutors/liujing.jpg",
         "courses": [
            "MATH 114",
            "MATH 115",
            "MATH 125",
            "MATH 240",
            "MATH 373",
            "STAT 151",
            "STAT 252"
         ],
         "intro": "3年tutor经验，曾教授超百名学生，其他课程请咨询.",
         "appointment": "提前三天预约",
         "availableTime": "周一至周五16:00 – 20:00, 周六 全天",
         "rates": [
            {
               "name": "1, Level 1",
               "rate": 40
            },
            {
               "name": "1, Level 2",
               "rate": 45
            },
            {
               "name": "1, Level 3",
               "rate": 50
            },
            {
               "name": "多, Level 1",
               "rate": 25
            },
            {
               "name": "多, Level 2",
               "rate": 30
            },
            {
               "name": "多, Level 3",
               "rate": 35
            }
         ],
         "maxStudents": "5"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjLlLDtVfGFJxAMZEy",
      "_score": 1,
      "_source": {
         "name": "赵雨佳",
         "phone": "7802356528",
         "email": "yujia3@ualberta.ca",
         "avatar": "images/tutors/zhaoyujia.jpg",
         "courses": [
            "MATH 100",
            "MATH 101",
            "MATH 102",
            "MATH 201",
            "MATH 209",
            "MATH 125",
            "MATH 225",
            "MATH 222",
            "MATH 114",
            "MATH 115",
            "MATH 214",
            "MATH 215",
            "MATH 314",
            "MATH 334",
            "STAT 151",
            "STAT 252",
            "STAT 265",
            "STAT 266",
            "STAT 235",
            "STAT 278"
         ],
         "intro": "3年tutor经验，曾教授过80名学生，加微信zhaoyujiazaichzh。",
         "appointment": "提前2天预约",
         "availableTime": "提前2天预约",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "多",
               "rate": 25
            }
         ],
         "maxStudents": "1+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjLyxBtVfGFJxAMZEz",
      "_score": 1,
      "_source": {
         "name": "刘芳慧",
         "phone": "7809946027",
         "email": "Fanghui@ualberta.ca",
         "avatar": "images/tutors/liufanghui.JPG",
         "courses": [
            "CHEM 243"
         ],
         "intro": "1年tutor经验，1年TA经验，seminar160余人",
         "appointment": "提前三天预约",
         "availableTime": "周一至周五 晚上, 每周末 全天",
         "rates": [
            {
               "name": "1",
               "rate": 30
            }
         ],
         "maxStudents": "1"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVgjRZtBtVfGFJxAMZE6",
      "_score": 1,
      "_source": {
         "name": "张思训",
         "phone": "7809328080",
         "email": "zhangsixun1024@gmail.com",
         "avatar": "images/tutors/zhangsixun.jpg",
         "courses": [
            "ACCTG 418",
            "ACCTG 467",
            "ACCTG 414",
            "ACCTG 415",
            "ACCTG 322",
            "ACCTG 311",
            "FIN 422",
            "FIN 412",
            "FIN 301",
            "MATH 222",
            "OM 352",
            "MGTSC 312",
            "STAT 151",
            "ECON 101",
            "ECON 102"
         ],
         "intro": "3年tutor经验，以会计相关科目和商学院基础课为主。Cumulative GPA 3.9",
         "appointment": "提前三天预约",
         "availableTime": "每周一 11Am - 8 Pm, 每周二、四 1:30Pm - 8 Pm, 每周五六日 全天",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "2-5",
               "rate": 25
            },
            {
               "name": "6-20",
               "rate": 20
            }
         ],
         "maxStudents": "不限"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVg8HuB3tVfGFJxAMZFC",
      "_score": 1,
      "_source": {
         "name": "郝增奔",
         "phone": "7802788062",
         "email": "uabenjamin@gmail.com",
         "avatar": "images/tutors/haozengben.png",
         "courses": [
            "CMPUT 101",
            "CMPUT 174",
            "CMPUT 175",
            "CMPUT 201",
            "CMPUT 204",
            "CMPUT 274",
            "CMPUT 275"
         ],
         "intro": "3年tutor经验，曾教过超过100名学生。",
         "appointment": "提前一天预约",
         "availableTime": "每周一至周五 6pm - 10pm，每周末 全天",
         "rates": [
            {
               "name": "1",
               "rate": 30
            },
            {
               "name": "2",
               "rate": 25
            },
            {
               "name": "3+",
               "rate": 20
            }
         ],
         "maxStudents": "1+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVg8Eye8tVfGFJxAMZFA",
      "_score": 1,
      "_source": {
         "name": "张行之",
         "phone": "7806950180",
         "email": "xingzhi1@ualberta.ca",
         "avatar": "images/tutors/zhangxingzhi.png",
         "courses": [
            "ECON All Level",
            "MATH 1,2,3 level",
            "STAT 1,2,3 level",
            "FIN 301",
            "FIN 412",
            "FIN 413",
            "OM 352",
            "ACCTG 311"
         ],
         "intro": "4年tutor经验，已辅导过300余位学生，老司机，经验丰富，有口皆碑。",
         "appointment": "随时可以联系我",
         "availableTime": "每日皆可，与您一起商量对您最合适时间",
         "rates": [],
         "maxStudents": "1+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AViFUS0EtVfGFJxAMZFP",
      "_score": 1,
      "_source": {
         "name": "朱锐",
         "phone": "7807081963",
         "email": "rui.tyler.zhu@gmail.com",
         "avatar": "images/tutors/zhurui.png",
         "courses": [
            "CMPUT 174",
            "CMPUT 175",
            "CMPUT 201",
            "CMPUT 204",
            "CMPUT 229",
            "CMPUT 304",
            "CMPUT 366",
            "MATH 100 Level",
            "MATH 209",
            "MATH 214",
            "MATH 215",
            "MATH 222",
            "MATH 225",
            "MATH 228",
            "MATH 241",
            "PHYS 100 Level",
            "PHYS 230",
            "PHYS 281",
            "STAT 151"
         ],
         "intro": "3年tutor经验，曾教授过50多名学生",
         "appointment": "提前三天预约",
         "availableTime": "每周工作日 6pm - 10 pm, 每周末 全天",
         "rates": [
            {
               "name": "1, 100 level",
               "rate": "35"
            },
            {
               "name": "1, 200 level",
               "rate": "40"
            },
            {
               "name": "2-5",
               "rate": "35"
            },
            {
               "name": "6+",
               "rate": "25"
            }
         ],
         "maxStudents": "1+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AViJ3uoftVfGFJxAMZFU",
      "_score": 1,
      "_source": {
         "name": "黄文元",
         "phone": "7806956751",
         "email": "wenyuan@ualberta.ca",
         "avatar": null,
         "courses": [
            "CHEM 10x",
            "CHEM 26x",
            "FIN 301",
            "PHYS 30",
            "CHEM 30",
            "MATH 30"
         ],
         "intro": "多年tutor经验，辅导过上百位学生，既有从一无所知带到成绩优异，也有从平均水平拉高到名列前茅，教学有效又生动。",
         "appointment": "提前三天预约",
         "availableTime": "每周一至周五 晚6:00pm 后, 每周末 全天",
         "rates": [
            {
               "name": "1",
               "rate": 40
            },
            {
               "name": "2-5",
               "rate": 30
            },
            {
               "name": "6+",
               "rate": 25
            }
         ],
         "maxStudents": "2+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AViFV-4ytVfGFJxAMZFR",
      "_score": 1,
      "_source": {
         "name": "夏炜俊",
         "phone": "7807167647",
         "email": "w.xia@ualberta.ca",
         "avatar": "images/tutors/xiaweijun.jpg",
         "courses": [
            "MATH 113",
            "MATH 114",
            "MATH 115",
            "MATH 125",
            "MATH 100",
            "MATH 102",
            "MATH 201"
         ],
         "intro": "3年tutor经验，曾教授过50多名学生",
         "appointment": "提前三天预约",
         "availableTime": "每周二四 11am - 5 pm, 每周末 全天",
         "rates": [
            {
               "name": "1",
               "rate": "35"
            },
            {
               "name": "2-5",
               "rate": "30"
            },
            {
               "name": "6+",
               "rate": "25"
            }
         ],
         "maxStudents": "不限"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AViFXCWHtVfGFJxAMZFS",
      "_score": 1,
      "_source": {
         "name": "李莹",
         "phone": "7808682745",
         "email": "liyingeunice@gmail.com",
         "avatar": "images/tutors/liying.jpg",
         "courses": [
            "MATH 253",
            "STAT 252",
            "PHIL 120",
            "PHYS 124"
         ],
         "intro": "耐心负责，善于和人沟通。",
         "appointment": "提前三天预约",
         "availableTime": "每周五 3pm - 8 pm，, 每周末 全天, 周一到周四 需协调时间",
         "rates": [],
         "maxStudents": "不限"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVi46A9ztVfGFJxAMZFj",
      "_score": 1,
      "_source": {
         "name": "周沂",
         "phone": "7808850682",
         "wechat": "1013952638",
         "avatar": "images/tutors/zhouyi.jpg",
         "courses": [
            "MATH 1-level",
            "MATH 201",
            "MATH 209",
            "MATH 214",
            "MATH 215",
            "MATH 225",
            "MATH 314",
            "MATH 334",
            "STAT 1-level",
            "STAT 2-level",
            "STAT 361",
            "STAT 371",
            "STAT 378",
            "STAT 441"
         ],
         "intro": "UofA 数学系统计专业博士在读，对 UofA 和 Mcewan 数学 统计考试题型熟悉",
         "appointment": "提前预约",
         "availableTime": "具体商量, midterm final收费价格可能会略有提高",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "2",
               "rate": 25
            },
            {
               "name": "3+",
               "rate": 20
            }
         ],
         "maxStudents": "3+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVi47eugtVfGFJxAMZFl",
      "_score": 1,
      "_source": {
         "name": "李凯",
         "phone": "7807107065",
         "email": "kli2@ualberta.ca",
         "avatar": "images/tutors/likai.png",
         "courses": [
            "ACCTG 311",
            "FIN 301",
            "ECON 101"
         ],
         "intro": "2年tutor经验,教过几十名学生。每门课都有自己总结的讲义，和往年试题帮助复习",
         "appointment": "提前三天预约。",
         "availableTime": "联系我协商",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "2",
               "rate": 30
            },
            {
               "name": "3+",
               "rate": 25
            }
         ],
         "maxStudents": "4+"
      }
   },
   {
      "_index": "datui",
      "_type": "tutors",
      "_id": "AVi43_KytVfGFJxAMZFh",
      "_score": 1,
      "_source": {
         "name": "裴蕾",
         "phone": "7808858054",
         "email": "lpei1@ualberta.ca",
         "avatar": "images/tutors/peilei.jpg",
         "courses": [
            "STAT 141",
            "STAT 151",
            "STAT 252"
         ],
         "intro": "本科统计课程97%, 3年tutor经验，曾交手过40+名学生",
         "appointment": "提前两天预约",
         "availableTime": "8AM ~ 4PM",
         "rates": [
            {
               "name": "1",
               "rate": 35
            },
            {
               "name": "2",
               "rate": 25
            },
            {
               "name": "3+",
               "rate": 20
            }
         ],
         "maxStudents": "3+"
      }
   }];

const exportData = {tutors:{}};
json.map((tutor) => {
  const tid = tutor._id;
  const info = tutor._source;

  exportData.tutors[tid] = {
    uid: '',
    details: info
  };
});

console.log(JSON.stringify(exportData));
