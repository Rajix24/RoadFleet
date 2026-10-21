const CamionController = require("../../controllers/camion.controller");
const { getAllCamions } = require("../../repository/camion.repository");
const CamionService = require("../../services/camion.service")


jest.mock('../../services/camion.service', ()=>({
    getAllCamions: jest.fn(),
    saveCamion: jest.fn(),
    editCamion: jest.fn(),
    deleteCamion: jest.fn()
}))



describe('camion controller test',   ()=>{
    let req;
    let res;
    const fackCamions = [
        {
            "_id": "6accd19f0718003d9fb331d9",
            "number": "1001",
            "brand": "Mercedes-Benz",
            "model": "Actros",
            "consommation": 5.1,
            "vehicleStatus": "in_use",
            "acquisitionDate": "2024-03-15T00:00:00.000Z",
            "isArchived": false,
            "createdAt": "2026-10-12T12:25:03.340Z",
            "updatedAt": "2026-10-12T12:30:58.810Z",
            "__v": 0,
            "tires": [],
            "id": "6accd19f0718003d9fb331d9"
        },
        {
            "_id": "6accd1a90718003d9fb331da",
            "number": "1002",
            "brand": "Mercedes-Benz",
            "model": "Actros",
            "consommation": 5.1,
            "vehicleStatus": "in_use",
            "acquisitionDate": "2024-03-15T00:00:00.000Z",
            "isArchived": false,
            "createdAt": "2026-10-12T12:25:13.461Z",
            "updatedAt": "2026-10-12T12:25:13.461Z",
            "__v": 0,
            "tires": [],
            "id": "6accd1a90718003d9fb331da"
        },
    ]
    const fackCamion = {
            "_id": "6accd1a90718003d9fb331da",
            "number": "1002",
            "brand": "Mercedes-Benz",
            "model": "Actros",
            "consommation": 5.1,
            "vehicleStatus": "in_use",
            "acquisitionDate": "2024-03-15T00:00:00.000Z",
            "isArchived": false,
            "createdAt": "2026-10-12T12:25:13.461Z",
            "updatedAt": "2026-10-12T12:25:13.461Z",
            "__v": 0,
            "tires": [],
            "id": "6accd1a90718003d9fb331da"
        }

    const fackCamionUpdate = {
            "_id": "6accd1a90718003d9fb331da",
            "number": "1002",
            "brand": "BMW",
            "model": "Actros",
            "consommation": 5.1,
            "vehicleStatus": "in_use",
            "acquisitionDate": "2024-03-15T00:00:00.000Z",
            "isArchived": false,
            "createdAt": "2026-10-12T12:25:13.461Z",
            "updatedAt": "2026-10-12T12:25:13.461Z",
            "__v": 0,
            "tires": [],
            "id": "6accd1a90718003d9fb331da"
        }


    beforeEach(()=>{
        req = {}
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        jest.clearAllMocks()    
    })
    test("test getAllCamion Method in controller return all camions", async ()=>{

        CamionService.getAllCamions.mockResolvedValue(fackCamions);

        await CamionController.getAllCaminos(req, res)

        expect(res.status).toHaveBeenCalledWith(200) // valid test 
        expect(res.json).toHaveBeenCalledWith({ // valid test 
                message: "operation is done",
                data: fackCamions
        });

    })

    test("test for create method in controller return creation camion", async ()=>{
        req = {
            body:fackCamion
        }
        CamionService.saveCamion.mockResolvedValue(fackCamion)

        await CamionController.createCamion(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(fackCamion)
    })





    test("test function update method controller return update the camion ", async ()=>{
        req = {
            params: {number: "1002"},
            body: {brand: "BMW"}
        }

        CamionService.editCamion.mockResolvedValue(fackCamionUpdate)

        await CamionController.edit(req, res)

        expect(CamionService.editCamion).toHaveBeenCalledWith("1002", {brand: "BMW"})   
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(fackCamionUpdate)
    })

    test("test deleteCamion method in controller deletes a camion", async ()=>{
        req = {
            params: {number: "1002"}
        }
        const deleteResult = {deletedCount: 1}
        CamionService.deleteCamion.mockResolvedValue(deleteResult)

        await CamionController.deleteCamion(req, res)

        expect(CamionService.deleteCamion).toHaveBeenCalledWith(req.params)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            massage: "camion has been delete",
            response: deleteResult
        })
    })





})
