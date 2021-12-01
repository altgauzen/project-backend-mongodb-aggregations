db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { partner: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$airline.name", "$$partner"],
                },
              ],
            },
          },
        },
      ],
      as: "parcerias",
    },
  },
  {
    $unwind: "$parcerias",
  },
  {
    $match: {
      "parcerias.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $limit: 1,
  },
]);
