db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $nin: ["", null],
      },
    },
  },
  {
    $addFields: {
      convertedBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
