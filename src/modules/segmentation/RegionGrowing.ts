import { PointCloud, Vector, wrapPointCloud, wrapPoints } from '@/modules/common/PointCloud';
import {
  XYZPointTypes,
  XYZPointTypesTypeof,
  PointXYZ,
  PointXYZRGB,
  Normal,
} from '@/modules/common/point-types';
import Search from '@/modules/search/Search';
import { UnionToIntersection, Emscripten } from '@/types';
import PCLBase from '@/modules/common/PCLBase';
import KdTree from '@/modules/kdtree/KdTree';

class RegionGrowing<
  T extends XYZPointTypes = PointXYZ & Partial<UnionToIntersection<XYZPointTypes>>,
  normals = Normal,
> extends PCLBase<T> {
  public _native: Emscripten.NativeAPI;

  constructor(PT: XYZPointTypesTypeof = PointXYZ) {
    const _native = new __PCLCore__[`RegionGrowing${PT.name}`]();
    super(_native);
    this._native = _native;
  }

  public setMinClusterSize(minClusterSize: number) {
    this._native.setMinClusterSize(minClusterSize);
  }

  public getMinClusterSize(): number {
    return this._native.getMinClusterSize();
  }

  public setMaxClusterSize(maxClusterSize: number) {
    this._native.setMaxClusterSize(maxClusterSize);
  }

  public getMaxClusterSize(): number {
    return this._native.getMaxClusterSize();
  }

  public setSmoothModeFlag(value: boolean) {
    this._native.setSmoothModeFlag(value);
  }

  public getSmoothModeFlag(): number {
    return this._native.getSmoothModeFlag();
  }

  public setCurvatureTestFlag(value: boolean) {
    this._native.setSmoothModeFlag(value);
  }

  public getCurvatureTestFlag(): number {
    return this._native.getSmoothModeFlag();
  }

  public setResidualTestFlag(value: boolean) {
    this._native.setSmoothModeFlag(value);
  }

  public getResidualTestFlag(): number {
    return this._native.getSmoothModeFlag();
  }

  public setSmoothnessThreshold(theta: number) {
    this._native.setSmoothnessThreshold(theta);
  }

  public getSmoothnessThreshold(): number {
    return this._native.getSmoothnessThreshold();
  }

  public setResidualThreshold(theta: number) {
    this._native.setResidualThreshold(theta);
  }

  public getResidualThreshold(): number {
    return this._native.getResidualThreshold();
  }

  public setCurvatureThreshold(theta: number) {
    this._native.setCurvatureThreshold(theta);
  }

  public getCurvatureThreshold(): number {
    return this._native.getCurvatureThreshold();
  }

  public setSearchMethod(tree: KdTree<T>) {
    this._native.setSearchMethod(tree._native);
  }

  public getSearchMethod(): KdTree<T> {
    return this._native.getSearchMethod();
  }

  public setNumberOfNeighbours(neighbourNumber: number) {
    this._native.setNumberOfNeighbours(neighbourNumber);
  }

  public getNumberOfNeighbours(): number {
    return this._native.getNumberOfNeighbours();
  }

  public setInputNormals(norm: PointCloud<Normal>) {
    this._native.setInputNormals(norm._native);
  }

  public getInputNormals(): PointCloud<Normal> {
    return this._native.getInputNormals();
  }

  public extract() {
    const clusters = new Vector(new __PCLCore__.VectorPointIndices());
    this._native.extract(clusters._native);
    return clusters;
  }

  public getColoredCloud() {
    return wrapPointCloud<PointXYZRGB>(this._native.getColoredCloud());
  }
}

export default RegionGrowing;
