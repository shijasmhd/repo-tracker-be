const db = require('../utils/db');
const { Bookmark } = db;

const createBookMark = (userId, repoData) => {
  return Bookmark.create({
    data: {
      id: repoData.id,
      url: repoData.url,
      repoName: repoData.name,
      repoOwner: repoData.ownerName,
      userId
    }
  });
};

const getBookMarks = (userId, { startDate, endDate, page }) => {
  const whereClause = {
    userId,
    AND: []
  };

  if (startDate) {
    whereClause.AND.push({
      createdAt: {
        gte: new Date(startDate), // gte: greater than or equal to startDate
      }
    });
  }
  if (endDate) {
    whereClause.AND.push({
      createdAt: {
        lte: new Date(endDate), // lte: greater than or equal to endDate
      }
    });
  }

  const opts = {
    where: whereClause,
    orderBy: {
      createdAt: 'desc'
    }
  }

  if (page) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    opts.skip = skip;
    opts.take = pageSize;
  }

  return Bookmark.findMany(opts);
};

const getBookMarksCountByDate = async (userId, { startDate, endDate }) => {
  const bookmarksCount = await Bookmark.groupBy({
    by: ['createdAt'],
    where: {
      userId,
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    },
    _count: {
      _all: true,
    },
  });

  return bookmarksCount.map(item => ({
    date: item.createdAt.toISOString().split('T')[0], // Format date
    count: item._count._all,
  }));
};

const getBookMarkById = (userId, id) => {
  return Bookmark.findUnique({
    where: { userId, id }
  });
};

const getBookMarkByUrl = (userId, url) => {
  return Bookmark.findUnique({
    where: { userId, url }
  });
};

const deleteBookMark = (userId, id) => {
  return Bookmark.delete({
    where: { userId, id }
  });
};

module.exports = {
  createBookMark,
  getBookMarks,
  getBookMarksCountByDate,
  getBookMarkById,
  getBookMarkByUrl,
  deleteBookMark,
}