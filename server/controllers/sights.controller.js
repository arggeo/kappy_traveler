// const { test } = require('vitest');
import { getSights, getTopSights } from '../services/sights.service.js'

export async function get(req, res) {
    const cityName = req.params.cityName
    try {
        res.ok((await getSights(cityName))?.data?.results);
    } catch (error) {    
        res.error(error.message);
    }   
}

export function getDefaultRoute(req, res) {
    res.ok(getTopSights());
}