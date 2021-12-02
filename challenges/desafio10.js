db.trips.aggregate([
  {
    $project: {
      _id: 0,
      tipo: "$usertype",
      duracao: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000 * 60,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$tipo",
      duracaoMed: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMed", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
