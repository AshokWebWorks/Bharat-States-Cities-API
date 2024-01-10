const pool = require("../db");

const getAllStates = async (req, res) => {
  try {
    // Extracting query parameters with default values
    const limit = parseInt(req.query.limit) || 36;
    const page = parseInt(req.query.page) || 1;
    const is_ut = req.query.is_ut;

    // Calculating offset based on pagination
    const offset = (page - 1) * limit;

    // Constructing the initial SQL query
    let getQuery = "SELECT * FROM states";

    // Adding a conditional WHERE clause for is_union_territory
    if (is_ut && (is_ut === "true" || is_ut === "false")) {
      getQuery += ` WHERE is_union_territory=${is_ut}`;
    }

    // Executing the SQL query with limit and offset
    const { rows } = await pool.query(`${getQuery} LIMIT $1 OFFSET $2`, [
      limit,
      offset,
    ]);

    // Calculating total count of records
    const totalCount = await pool.query("SELECT COUNT(*) FROM states");
    const total_results = parseInt(totalCount.rows[0]?.count) || 0;

    // Calculating total pages based on limit
    const total_pages = Math.ceil(total_results / limit);

    // Responding with the fetched data
    if (rows.length > 0) {
      res.status(200).json({
        page,
        success: true,
        message: "Data retrieved successfully",
        results: {
          states: rows,
        },
        total_pages,
        total_results,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Data found",
        results: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        details: "An error occurred while fetching states.",
      },
    });
  }
};

const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM states WHERE id = $1", [
      id,
    ]);
    // Responding with the fetched data
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        results: rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "The resource you requested could not be found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        details: "An error occurred while fetching states.",
      },
    });
  }
};

const getCitiesByStateId = async (req, res) => {
  try {
    // Extracting query parameters with default values
    const limit = parseInt(req.query.limit) || 36;
    const page = parseInt(req.query.page) || 1;
    // Calculating offset based on pagination
    const offset = (page - 1) * limit;
    const { id } = req.params;
    // Assuming there is a 'cities' table with columns 'id', 'name', 'state_id', etc.
     const stateResults=await pool.query('SELECT * FROM states WHERE id=$1',[id]);
     const state=stateResults.rows;
    const citiesResults = await pool.query(
      "SELECT * FROM cities WHERE state_id = $1 LIMIT $2 OFFSET $3",
      [id,limit,offset] 
    );
    const cities = citiesResults.rows;
       // Calculating total count of records
       const totalCount = await pool.query("SELECT COUNT(*) FROM cities WHERE state_id = $1",[id]);
       const total_results = parseInt(totalCount.rows[0]?.count) || 0;
   
       // Calculating total pages based on limit
       const total_pages = Math.ceil(total_results / limit);

    // Responding with the fetched data
    if (cities.length > 0) {
      res.status(200).json({
        page,
        success: true,
        message: "Data retrieved successfully",
        results: {
            state,
          cities,
        },
        total_pages,
        total_results,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Data found",
        results: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        details: "An error occurred while fetching cities.",
      },
    });
  }
};

const getAllCities=async (req, res) => {
try {
     // Extracting query parameters with default values
     const limit = parseInt(req.query.limit) || 36;
     const page = parseInt(req.query.page) || 1;
     const is_ut = req.query.is_ut;
 
     // Calculating offset based on pagination
     const offset = (page - 1) * limit;

     // Executing the SQL query with limit and offset
     const { rows } = await pool.query('SELECT * FROM cities LIMIT $1 OFFSET $2', [
       limit,
       offset,
     ]);
 
     // Calculating total count of records
     const totalCount = await pool.query("SELECT COUNT(*) FROM cities");
     const total_results = parseInt(totalCount.rows[0]?.count) || 0;
 
     // Calculating total pages based on limit
     const total_pages = Math.ceil(total_results / limit);
 
     // Responding with the fetched data
     if (rows.length > 0) {
       res.status(200).json({
         page,
         success: true,
         message: "Data retrieved successfully",
         results: {
           cities: rows,
         },
         total_pages,
         total_results,
       });
     } else {
       res.status(404).json({
         success: false,
         message: "No Data found",
         results: [],
       });
     }
    
} catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        details: "An error occurred while fetching cities.",
      },
    });
}
}
module.exports = {
  getAllStates,
  getStateById,
  getCitiesByStateId,
  getAllCities
};
