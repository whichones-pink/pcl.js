import fs from 'fs';
import path from 'path';
import * as PCL from '../../';
import { removeNaNFromPointCloud } from '../../';

describe('RegionGrowing', () => {
  it('should segment a point cloud using RegionGrowing', () => {
    const data = fs.readFileSync(path.join(global.ROOT_DIR, 'data/region_growing_tutorial.pcd'));
    const cloud = PCL.loadPCDData<PCL.PointXYZ>(data, PCL.PointXYZ);

    const tree = new PCL.SearchKdTree<PCL.PointXYZ>(PCL.PointXYZ);
    const normals = new PCL.PointCloud<PCL.Normal>(PCL.Normal);
    const normalEstimator = new PCL.NormalEstimation<PCL.PointXYZ, PCL.Normal>();
    normalEstimator.setSearchMethod(tree);
    normalEstimator.setInputCloud(cloud);
    normalEstimator.setKSearch(50);
    normalEstimator.compute(normals);

    const indices = new PCL.Indices();
    removeNaNFromPointCloud(cloud, cloud, indices);

    const reg = new PCL.RegionGrowing<PCL.PointXYZ, PCL.Normal>(PCL.PointXYZ);
    reg.setMinClusterSize(50);
    reg.setMaxClusterSize(1000000);
    reg.setSearchMethod(tree);
    reg.setNumberOfNeighbours(30);
    reg.setInputCloud(cloud);
    reg.setInputNormals(normals);
    reg.setSmoothnessThreshold((3.0 / 180.0) * Math.PI);
    reg.setCurvatureThreshold(1.0);

    const clusters = reg.extract();
    expect(clusters.size).toBe(115);
  });
});
