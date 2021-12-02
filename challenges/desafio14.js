db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMinutos: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaPrevia: {
        $avg: "$duracaoEmMinutos",
      },
    },
  },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMediaPrevia",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
